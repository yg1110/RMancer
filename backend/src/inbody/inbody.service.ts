import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateInbodyRecordDto } from './dto/create-inbody-record.dto';
import { UpdateInbodyRecordDto } from './dto/update-inbody-record.dto';
import { InbodyRecordResponseDto } from './dto/inbody-record-response.dto';
import { INBODY_ERROR_MESSAGE } from './inbody.constants';
import { InbodyRepository } from './inbody.repository';

@Injectable()
export class InbodyService {
  constructor(private readonly inbodyRepository: InbodyRepository) {}

  async create(
    userId: string,
    createDto: CreateInbodyRecordDto,
  ): Promise<InbodyRecordResponseDto> {
    try {
      const record = await this.inbodyRepository.create({
        userId,
        measuredAt: new Date(createDto.measuredAt),
        heightCm: createDto.heightCm,
        weightKg: createDto.weightKg,
        skeletalMuscleKg: createDto.skeletalMuscleKg,
        bodyFatKg: createDto.bodyFatKg,
        bodyFatPct: createDto.bodyFatPct,
      });

      return record;
    } catch (error) {
      throw new InternalServerErrorException(
        INBODY_ERROR_MESSAGE.INBODY_RECORD_CREATE_FAILED,
      );
    }
  }

  async findAll(userId: string): Promise<InbodyRecordResponseDto[]> {
    return this.inbodyRepository.findAllByUserId(userId);
  }

  async findOne(id: string, userId: string): Promise<InbodyRecordResponseDto> {
    const record = await this.inbodyRepository.findByIdAndUserId(id, userId);

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

    const record = await this.inbodyRepository.updateById(id, updateData);

    return record;
  }

  async remove(id: string, userId: string): Promise<void> {
    await this.findOne(id, userId);

    await this.inbodyRepository.deleteById(id);
  }
}
