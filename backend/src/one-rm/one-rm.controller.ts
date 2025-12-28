import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
  UnauthorizedException,
  Query,
} from '@nestjs/common';
import {
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiTags,
  ApiQuery,
} from '@nestjs/swagger';
import { OneRmService } from './one-rm.service';
import { CreateOneRmRecordDto } from './dto/create-one-rm-record.dto';
import { UpdateOneRmRecordDto } from './dto/update-one-rm-record.dto';
import { OneRmRecordResponseDto } from './dto/one-rm-record-response.dto';
import { AccessTokenGuard } from '../auth/guards/access-token.guard';
import { ERROR_MESSAGE } from 'src/common/error.constants';
import { ONE_RM_ERROR_MESSAGE } from './one-rm.constants';
import { OneRmLift } from '@prisma/client';

@ApiTags('1RM 기록')
@Controller('one-rm')
@UseGuards(AccessTokenGuard)
@ApiBearerAuth('access-token')
export class OneRmController {
  constructor(private readonly oneRmService: OneRmService) {}

  @Post()
  @ApiOperation({
    summary: '1RM 기록 생성',
  })
  @ApiResponse({
    status: 201,
    type: OneRmRecordResponseDto,
  })
  @ApiResponse({
    status: 401,
    description: ERROR_MESSAGE.UNAUTHORIZED,
  })
  async create(
    @Request() req: Express.Request,
    @Body() createDto: CreateOneRmRecordDto,
  ): Promise<OneRmRecordResponseDto> {
    const userId = req.user?.sub;
    if (!userId) {
      throw new UnauthorizedException(ERROR_MESSAGE.USER_NOT_FOUND);
    }
    return this.oneRmService.create(userId, createDto);
  }

  @Get()
  @ApiOperation({
    summary: '1RM 기록 전체 조회',
    description:
      '현재 사용자의 모든 1RM 기록을 최신순으로 조회합니다. lift 쿼리 파라미터로 특정 운동 종류만 필터링할 수 있습니다.',
  })
  @ApiQuery({
    name: 'lift',
    required: false,
    enum: OneRmLift,
    description:
      '운동 종류로 필터링 (BENCH_PRESS, BACK_SQUAT, DEADLIFT, OVERHEAD_PRESS)',
  })
  @ApiResponse({
    status: 200,
    type: [OneRmRecordResponseDto],
  })
  @ApiResponse({
    status: 401,
    description: ERROR_MESSAGE.UNAUTHORIZED,
  })
  async findAll(
    @Request() req: Express.Request,
    @Query('lift') lift?: OneRmLift,
  ): Promise<OneRmRecordResponseDto[]> {
    const userId = req.user?.sub;
    if (!userId) {
      throw new UnauthorizedException(ERROR_MESSAGE.USER_NOT_FOUND);
    }
    return this.oneRmService.findAll(userId, lift);
  }

  @Get(':id')
  @ApiOperation({
    summary: '1RM 기록 단일 조회',
    description: '특정 1RM 기록의 상세 정보를 조회합니다.',
  })
  @ApiResponse({
    status: 200,
    type: OneRmRecordResponseDto,
  })
  @ApiResponse({
    status: 401,
    description: ERROR_MESSAGE.UNAUTHORIZED,
  })
  @ApiResponse({
    status: 404,
    description: ONE_RM_ERROR_MESSAGE.ONE_RM_RECORD_NOT_FOUND,
  })
  async findOne(
    @Request() req: Express.Request,
    @Param('id') id: string,
  ): Promise<OneRmRecordResponseDto> {
    const userId = req.user?.sub;
    if (!userId) {
      throw new UnauthorizedException(ERROR_MESSAGE.USER_NOT_FOUND);
    }
    return this.oneRmService.findOne(id, userId);
  }

  @Patch(':id')
  @ApiOperation({
    summary: '1RM 기록 수정',
    description: '기존 1RM 기록의 정보를 수정합니다.',
  })
  @ApiResponse({
    status: 200,
    description: '1RM 기록이 성공적으로 수정되었습니다.',
    type: OneRmRecordResponseDto,
  })
  @ApiResponse({
    status: 401,
    description: ERROR_MESSAGE.UNAUTHORIZED,
  })
  @ApiResponse({
    status: 404,
    description: ONE_RM_ERROR_MESSAGE.ONE_RM_RECORD_NOT_FOUND,
  })
  async update(
    @Request() req: Express.Request,
    @Param('id') id: string,
    @Body() updateDto: UpdateOneRmRecordDto,
  ): Promise<OneRmRecordResponseDto> {
    const userId = req.user?.sub;
    if (!userId) {
      throw new UnauthorizedException(ERROR_MESSAGE.USER_NOT_FOUND);
    }
    return this.oneRmService.update(id, userId, updateDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: '1RM 기록 삭제',
    description: '특정 1RM 기록을 삭제합니다.',
  })
  @ApiResponse({
    status: 200,
  })
  @ApiResponse({
    status: 401,
    description: ERROR_MESSAGE.UNAUTHORIZED,
  })
  @ApiResponse({
    status: 404,
    description: ONE_RM_ERROR_MESSAGE.ONE_RM_RECORD_NOT_FOUND,
  })
  async remove(
    @Request() req: Express.Request,
    @Param('id') id: string,
  ): Promise<void> {
    const userId = req.user?.sub;
    if (!userId) {
      throw new UnauthorizedException(ERROR_MESSAGE.USER_NOT_FOUND);
    }
    return this.oneRmService.remove(id, userId);
  }
}
