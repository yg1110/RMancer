import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateRoutineDto } from './dto/create-routine.dto';
import { UpdateRoutineDto } from './dto/update-routine.dto';
import { RoutineResponseDto } from './dto/routine-response.dto';
import { ROUTINE_ERROR_MESSAGE } from './routine.constants';
import { RoutineRepository } from './routine.repository';

@Injectable()
export class RoutineService {
  constructor(private readonly routineRepository: RoutineRepository) {}

  async create(
    userId: string,
    createDto: CreateRoutineDto,
  ): Promise<RoutineResponseDto> {
    try {
      const routine = await this.routineRepository.createWithDays({
        userId,
        title: createDto.title,
        goalType: createDto.goalType,
        experienceLevel: createDto.experienceLevel,
        weeklyFrequency: createDto.weeklyFrequency,
        days: {
          create: createDto.days.map(day => ({
            dayIndex: day.dayIndex,
            name: day.name,
            subExercises: {
              create: day.subExercises.map(exercise => ({
                order: exercise.order,
                sets: exercise.sets,
                reps: exercise.reps,
                oneRmPct: exercise.oneRmPct,
                exerciseName: exercise.exerciseName,
                bodyPart: exercise.bodyPart,
                memo: exercise.memo,
                chooseOneExercises: exercise.chooseOneExercises,
              })),
            },
          })),
        },
      });

      return routine;
    } catch (error) {
      throw new InternalServerErrorException(
        ROUTINE_ERROR_MESSAGE.ROUTINE_CREATE_FAILED,
      );
    }
  }

  async findAll(userId: string): Promise<RoutineResponseDto[]> {
    return this.routineRepository.findAllByUserId(userId);
  }

  async getLatestRoutine(userId: string): Promise<RoutineResponseDto> {
    const routine = await this.routineRepository.findLatestByUserId(userId);
    if (!routine) {
      throw new NotFoundException(ROUTINE_ERROR_MESSAGE.ROUTINE_NOT_FOUND);
    }
    return routine;
  }

  async findOne(id: string, userId: string): Promise<RoutineResponseDto> {
    const routine = await this.routineRepository.findByIdAndUserId(id, userId);

    if (!routine) {
      throw new NotFoundException(ROUTINE_ERROR_MESSAGE.ROUTINE_NOT_FOUND);
    }

    return routine;
  }

  async update(
    id: string,
    userId: string,
    updateDto: UpdateRoutineDto,
  ): Promise<RoutineResponseDto> {
    await this.findOne(id, userId);

    const updateData: any = {};
    if (updateDto.title !== undefined) {
      updateData.title = updateDto.title;
    }
    if (updateDto.goalType !== undefined) {
      updateData.goalType = updateDto.goalType;
    }
    if (updateDto.experienceLevel !== undefined) {
      updateData.experienceLevel = updateDto.experienceLevel;
    }
    if (updateDto.weeklyFrequency !== undefined) {
      updateData.weeklyFrequency = updateDto.weeklyFrequency;
    }

    // days가 제공된 경우, 기존 days를 모두 삭제하고 새로 생성
    if (updateDto.days !== undefined) {
      // 기존 days와 subExercises를 모두 삭제
      await this.routineRepository.deleteSubExercisesByRoutineId(id);
      await this.routineRepository.deleteDaysByRoutineId(id);

      // 새로운 days와 subExercises 생성
      updateData.days = {
        create: updateDto.days.map(day => ({
          dayIndex: day.dayIndex,
          name: day.name,
          bodyPart: day.bodyPart,
          subExercises: {
            create: day.subExercises.map(exercise => ({
              order: exercise.order,
              sets: exercise.sets,
              reps: exercise.reps,
              oneRmPct: exercise.oneRmPct,
              exerciseName: exercise.exerciseName,
              chooseOneExercises: exercise.chooseOneExercises,
            })),
          },
        })),
      };
    }

    return this.routineRepository.updateWithDays(id, updateData);
  }

  async remove(id: string, userId: string): Promise<void> {
    await this.findOne(id, userId);

    // Cascade delete로 인해 자동으로 days와 subExercises도 삭제됨
    await this.routineRepository.deleteById(id);
  }
}
