import { Module } from '@nestjs/common';
import { GoalProfileService } from './goal.service';
import { GoalProfileController } from './goal.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [GoalProfileController],
  providers: [GoalProfileService],
})
export class GoalProfileModule {}
