import { Module } from '@nestjs/common';
import { InbodyService } from './inbody.service';
import { InbodyController } from './inbody.controller';
import { InbodyRepository } from './inbody.repository';

@Module({
  controllers: [InbodyController],
  providers: [InbodyService, InbodyRepository],
})
export class InbodyModule {}
