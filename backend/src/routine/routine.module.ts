import { Module } from '@nestjs/common';
import { RoutineService } from './routine.service';
import { RoutineController } from './routine.controller';
import { RoutineRepository } from './routine.repository';

@Module({
  controllers: [RoutineController],
  providers: [RoutineService, RoutineRepository],
})
export class RoutineModule {}

