import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { type Request } from 'express';
import { AccessTokenGuard } from './auth/guards/access-token.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller()
export class AppController {
  constructor() {}

  @Get('user-test')
  @UseGuards(AccessTokenGuard)
  @ApiBearerAuth('access-token')
  testUser(@Req() req: Request) {
    console.log(req.user);
    return 'test completed';
  }
}
