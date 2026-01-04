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
} from '@nestjs/common';
import {
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiTags,
} from '@nestjs/swagger';
import { OneRmService } from './one-rm.service';
import { CreateOneRmRecordDto } from './dto/create-one-rm-record.dto';
import { UpdateOneRmRecordDto } from './dto/update-one-rm-record.dto';
import { OneRmRecordResponseDto } from './dto/one-rm-record-response.dto';
import { AccessTokenGuard } from '../auth/guards/access-token.guard';
import { ERROR_MESSAGE } from 'src/common/error.constants';
import { ONE_RM_ERROR_MESSAGE } from './one-rm.constants';
import { OneRmAllResponseDto } from './dto/one-rm-all-response.dto';
import { CalculateOneRmDto } from './dto/calculate-one-rm.dto';

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

  @Post('calculate')
  @ApiOperation({
    summary: '1RM 계산 및 업데이트',
    description:
      '무게와 반복 횟수를 입력받아 1RM을 계산하고, 해당 운동 종류의 최신 1RM 기록을 업데이트합니다. 기록이 없으면 새로 생성합니다.',
  })
  @ApiResponse({
    status: 200,
    schema: {
      example: 2.5,
      type: 'number',
      description: '증가된 1RM 값(최초 기록이면 전체, 갱신 없으면 0)',
    },
  })
  @ApiResponse({
    status: 401,
    description: ERROR_MESSAGE.UNAUTHORIZED,
  })
  async calculateAndUpdate(
    @Request() req: Express.Request,
    @Body() calculateDto: CalculateOneRmDto,
  ): Promise<number> {
    const userId = req.user?.sub;
    if (!userId) {
      throw new UnauthorizedException(ERROR_MESSAGE.USER_NOT_FOUND);
    }
    return this.oneRmService.calculateAndUpdateOneRm(userId, calculateDto);
  }

  @Get()
  @ApiOperation({
    summary: '1RM 기록 요약 조회',
    description:
      '현재 사용자의 각 운동 종류(BENCH_PRESS, BACK_SQUAT, DEADLIFT, OVERHEAD_PRESS)에 대한 최신 1RM 기록을 객체로 반환합니다. 각 값이 없으면 0으로 반환합니다.',
  })
  @ApiResponse({
    status: 200,
    schema: {
      example: {
        BENCH_PRESS: 100,
        BACK_SQUAT: 140,
        DEADLIFT: 180,
        OVERHEAD_PRESS: 60,
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: ERROR_MESSAGE.UNAUTHORIZED,
  })
  async findAllOneRmObject(
    @Request() req: Express.Request,
  ): Promise<OneRmAllResponseDto> {
    const userId = req.user?.sub;
    if (!userId) {
      throw new UnauthorizedException(ERROR_MESSAGE.USER_NOT_FOUND);
    }
    return this.oneRmService.getAllOneRmObject(userId);
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
