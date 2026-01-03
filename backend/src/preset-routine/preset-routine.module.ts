import { Module } from '@nestjs/common';
import { PresetRoutineService } from './preset-routine.service';
import { PresetRoutineController } from './preset-routine.controller';
import { RoutineService } from 'src/routine/routine.service';

@Module({
  controllers: [PresetRoutineController],
  providers: [PresetRoutineService, RoutineService],
  exports: [PresetRoutineService],
})
export class PresetRoutineModule {}
