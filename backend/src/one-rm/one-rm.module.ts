import { Module } from '@nestjs/common';
import { OneRmService } from './one-rm.service';
import { OneRmController } from './one-rm.controller';

@Module({
  controllers: [OneRmController],
  providers: [OneRmService],
})
export class OneRmModule {}

