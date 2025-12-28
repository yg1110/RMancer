import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { InbodyModule } from './inbody/inbody.module';
import { GoalProfileModule } from './goal/goal.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    PrismaModule,
    InbodyModule,
    GoalProfileModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
