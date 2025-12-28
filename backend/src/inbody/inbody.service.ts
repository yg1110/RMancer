import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateInbodyRecordDto } from './dto/create-inbody-record.dto';
import { UpdateInbodyRecordDto } from './dto/update-inbody-record.dto';
import { InbodyRecordResponseDto } from './dto/inbody-record-response.dto';
import { INBODY_ERROR_MESSAGE } from './inbody.constants';

@Injectable()
export class InbodyService {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    userId: string,
    createDto: CreateInbodyRecordDto,
  ): Promise<InbodyRecordResponseDto> {
    const record = await this.prisma.inbodyRecord.create({
      data: {
        userId,
        measuredAt: new Date(createDto.measuredAt),
        heightCm: createDto.heightCm,
        weightKg: createDto.weightKg,
        skeletalMuscleKg: createDto.skeletalMuscleKg,
        bodyFatKg: createDto.bodyFatKg,
        bodyFatPct: createDto.bodyFatPct,
      },
    });

    return record;
  }

  async findAll(userId: string): Promise<InbodyRecordResponseDto[]> {
    const records = await this.prisma.inbodyRecord.findMany({
      where: {
        userId,
      },
      orderBy: {
        measuredAt: 'desc',
      },
    });

    return records;
  }

  async findOne(id: string, userId: string): Promise<InbodyRecordResponseDto> {
    const record = await this.prisma.inbodyRecord.findFirst({
      where: {
        id,
        userId,
      },
    });

    if (!record) {
      throw new NotFoundException(INBODY_ERROR_MESSAGE.INBODY_RECORD_NOT_FOUND);
    }

    return record;
  }

  async update(
    id: string,
    userId: string,
    updateDto: UpdateInbodyRecordDto,
  ): Promise<InbodyRecordResponseDto> {
    await this.findOne(id, userId);

    const updateData: any = {};
    if (updateDto.measuredAt !== undefined) {
      updateData.measuredAt = new Date(updateDto.measuredAt);
    }
    if (updateDto.heightCm !== undefined) {
      updateData.heightCm = updateDto.heightCm;
    }
    if (updateDto.weightKg !== undefined) {
      updateData.weightKg = updateDto.weightKg;
    }
    if (updateDto.skeletalMuscleKg !== undefined) {
      updateData.skeletalMuscleKg = updateDto.skeletalMuscleKg;
    }
    if (updateDto.bodyFatKg !== undefined) {
      updateData.bodyFatKg = updateDto.bodyFatKg;
    }
    if (updateDto.bodyFatPct !== undefined) {
      updateData.bodyFatPct = updateDto.bodyFatPct;
    }

    const record = await this.prisma.inbodyRecord.update({
      where: {
        id,
      },
      data: updateData,
    });

    return record;
  }

  async remove(id: string, userId: string): Promise<void> {
    await this.findOne(id, userId);

    await this.prisma.inbodyRecord.delete({
      where: {
        id,
      },
    });
  }
}
