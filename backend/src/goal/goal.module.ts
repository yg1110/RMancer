import { Module } from '@nestjs/common';
import { GoalProfileService } from './goal.service';
import { GoalProfileController } from './goal.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { GoalProfileRepository } from './goal.repository';

@Module({
  imports: [PrismaModule],
  controllers: [GoalProfileController],
  providers: [GoalProfileService, GoalProfileRepository],
})
export class GoalProfileModule {}
