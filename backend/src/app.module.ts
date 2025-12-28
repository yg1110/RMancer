import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { InbodyModule } from './inbody/inbody.module';
import { GoalProfileModule } from './goal/goal.module';
import { RoutineModule } from './routine/routine.module';
import { OneRmModule } from './one-rm/one-rm.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    PrismaModule,
    InbodyModule,
    GoalProfileModule,
    RoutineModule,
    OneRmModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
