import { Module } from '@nestjs/common';
import { RoutineService } from './routine.service';
import { RoutineController } from './routine.controller';
import { RoutineEngine } from './engine/routine-engine';

@Module({
  controllers: [RoutineController],
  providers: [RoutineService, RoutineEngine],
})
export class RoutineModule {}
