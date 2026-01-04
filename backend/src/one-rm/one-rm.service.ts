import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateOneRmRecordDto } from './dto/create-one-rm-record.dto';
import { UpdateOneRmRecordDto } from './dto/update-one-rm-record.dto';
import { OneRmRecordResponseDto } from './dto/one-rm-record-response.dto';
import { ONE_RM_ERROR_MESSAGE } from './one-rm.constants';
import { OneRmLift } from '@prisma/client';
import { OneRmAllResponseDto } from './dto/one-rm-all-response.dto';
import { CalculateOneRmDto } from './dto/calculate-one-rm.dto';

@Injectable()
export class OneRmService {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    userId: string,
    createDto: CreateOneRmRecordDto,
  ): Promise<OneRmRecordResponseDto> {
    try {
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
    } catch (error) {
      throw new InternalServerErrorException(
        ONE_RM_ERROR_MESSAGE.ONE_RM_RECORD_CREATE_FAILED,
      );
    }
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

  /**
   * 1RM 계산 (Epley 공식 사용)
   * 1RM = weight × (1 + reps / 30)
   */
  private calculateOneRm(weightKg: number, reps: number): number {
    if (reps === 1) {
      return weightKg;
    }
    return weightKg * (1 + reps / 30);
  }

  /**
   * 무게와 반복 횟수로 1RM을 계산하여 해당 운동의 최신 1RM 기록을 업데이트합니다.
   * 만약 calculatedOneRm가 최신기록보다 낮다면 추가하지 않습니다.
   * 오른 무게(증가분)만큼 리턴합니다. (증가분이 없으면 0)
   */
  async calculateAndUpdateOneRm(
    userId: string,
    calculateDto: CalculateOneRmDto,
  ): Promise<number> {
    const calculatedOneRm = this.calculateOneRm(
      calculateDto.weightKg,
      calculateDto.reps,
    );

    // 최신 기록 조회 (해당 lift)
    const latestRecord = await this.prisma.oneRmRecord.findFirst({
      where: {
        userId,
        lift: calculateDto.lift,
      },
      orderBy: {
        measuredAt: 'desc',
      },
    });

    // 최신 기록이 있으면 증가분 계산, 없으면 전체 리턴
    if (latestRecord) {
      if (+latestRecord.oneRmKg >= +calculatedOneRm) {
        return 0;
      }
      const increased = +calculatedOneRm - +latestRecord.oneRmKg;
      try {
        await this.prisma.oneRmRecord.create({
          data: {
            userId,
            lift: calculateDto.lift,
            oneRmKg: calculatedOneRm,
            measuredAt: new Date(),
          },
        });
        return increased;
      } catch (error) {
        throw new InternalServerErrorException(
          ONE_RM_ERROR_MESSAGE.ONE_RM_RECORD_CREATE_FAILED,
        );
      }
    } else {
      // 최초 기록인 경우 전체 무게를 증가분으로 리턴
      try {
        await this.prisma.oneRmRecord.create({
          data: {
            userId,
            lift: calculateDto.lift,
            oneRmKg: calculatedOneRm,
            measuredAt: new Date(),
          },
        });
        return +calculatedOneRm;
      } catch (error) {
        throw new InternalServerErrorException(
          ONE_RM_ERROR_MESSAGE.ONE_RM_RECORD_CREATE_FAILED,
        );
      }
    }
  }
}
