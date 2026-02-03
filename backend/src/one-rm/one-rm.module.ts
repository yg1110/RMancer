import { Module } from '@nestjs/common';
import { OneRmService } from './one-rm.service';
import { OneRmController } from './one-rm.controller';
import { OneRmRepository } from './one-rm.repository';

@Module({
  controllers: [OneRmController],
  providers: [OneRmService, OneRmRepository],
})
export class OneRmModule {}

