import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { InbodyModule } from './inbody/inbody.module';
import { GoalProfileModule } from './goal/goal.module';
import { OneRmModule } from './one-rm/one-rm.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { HealthModule } from './health/health.module';
import { RoutineModule } from './routine/routine.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    PrismaModule,
    InbodyModule,
    GoalProfileModule,
    OneRmModule,
    DashboardModule,
    HealthModule,
    RoutineModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
