import { Module } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { DashboardController } from './dashboard.controller';
import { OneRmService } from 'src/one-rm/one-rm.service';

@Module({
  controllers: [DashboardController],
  providers: [DashboardService, OneRmService],
})
export class DashboardModule {}
