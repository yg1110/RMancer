import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateOneRmRecordDto } from './dto/create-one-rm-record.dto';
import { UpdateOneRmRecordDto } from './dto/update-one-rm-record.dto';
import { OneRmRecordResponseDto } from './dto/one-rm-record-response.dto';
import { ONE_RM_ERROR_MESSAGE } from './one-rm.constants';
import { OneRmLift } from '@prisma/client';
import { OneRmAllResponseDto } from './dto/one-rm-all-response.dto';

@Injectable()
export class OneRmService {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    userId: string,
    createDto: CreateOneRmRecordDto,
  ): Promise<OneRmRecordResponseDto> {
    const record = await this.prisma.oneRmRecord.create({
      data: {
        userId,
        lift: createDto.lift,
        oneRmKg: createDto.oneRmKg,
        measuredAt: createDto.measuredAt
          ? new Date(createDto.measuredAt)
          : new Date(),
      },
    });

    return record;
  }

  async findAll(
    userId: string,
    lift?: OneRmLift,
  ): Promise<OneRmRecordResponseDto[]> {
    const where: any = {
      userId,
    };

    if (lift) {
      where.lift = lift;
    }

    const records = await this.prisma.oneRmRecord.findMany({
      where,
      orderBy: {
        measuredAt: 'desc',
      },
    });

    return records;
  }

  async findOne(id: string, userId: string): Promise<OneRmRecordResponseDto> {
    const record = await this.prisma.oneRmRecord.findFirst({
      where: {
        id,
        userId,
      },
    });

    if (!record) {
      throw new NotFoundException(ONE_RM_ERROR_MESSAGE.ONE_RM_RECORD_NOT_FOUND);
    }

    return record;
  }

  async update(
    id: string,
    userId: string,
    updateDto: UpdateOneRmRecordDto,
  ): Promise<OneRmRecordResponseDto> {
    await this.findOne(id, userId);

    const updateData: any = {};
    if (updateDto.lift !== undefined) {
      updateData.lift = updateDto.lift;
    }
    if (updateDto.oneRmKg !== undefined) {
      updateData.oneRmKg = updateDto.oneRmKg;
    }
    if (updateDto.measuredAt !== undefined) {
      updateData.measuredAt = new Date(updateDto.measuredAt);
    }

    const record = await this.prisma.oneRmRecord.update({
      where: {
        id,
      },
      data: updateData,
    });

    return record;
  }

  async remove(id: string, userId: string): Promise<void> {
    await this.findOne(id, userId);

    await this.prisma.oneRmRecord.delete({
      where: {
        id,
      },
    });
  }

  async getAllOneRmObject(userId: string): Promise<OneRmAllResponseDto> {
    const records = await this.findAll(userId);

    // 각 리프트의 최신 기록을 찾기 위한 reduce
    const lifts: OneRmLift[] = [
      OneRmLift.BENCH_PRESS,
      OneRmLift.BACK_SQUAT,
      OneRmLift.DEADLIFT,
      OneRmLift.OVERHEAD_PRESS,
    ];

    // 최신 기록만 담을 객체 초기화
    const latestRecords: { [key in OneRmLift]: number } = {
      BENCH_PRESS: 0,
      BACK_SQUAT: 0,
      DEADLIFT: 0,
      OVERHEAD_PRESS: 0,
    };

    for (const lift of lifts) {
      // 해당 lift의 최신 기록 추출 (measuredAt, 없으면 createdAt 기준)
      const filtered = records
        .filter(r => r.lift === lift)
        .sort((a, b) => {
          const aDate = a.measuredAt
            ? new Date(a.measuredAt).getTime()
            : new Date(a.createdAt).getTime();
          const bDate = b.measuredAt
            ? new Date(b.measuredAt).getTime()
            : new Date(b.createdAt).getTime();
          return bDate - aDate;
        });
      if (filtered.length > 0) {
        latestRecords[lift] = filtered[0].oneRmKg;
      }
    }

    return latestRecords;
  }
}
