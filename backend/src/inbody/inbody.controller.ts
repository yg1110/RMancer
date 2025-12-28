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
import { InbodyService } from './inbody.service';
import { CreateInbodyRecordDto } from './dto/create-inbody-record.dto';
import { UpdateInbodyRecordDto } from './dto/update-inbody-record.dto';
import { InbodyRecordResponseDto } from './dto/inbody-record-response.dto';
import { AccessTokenGuard } from '../auth/guards/access-token.guard';
import { ERROR_MESSAGE } from 'src/common/error.constants';
import { INBODY_ERROR_MESSAGE } from './inbody.constants';

@ApiTags('인바디 기록')
@Controller('inbody')
@UseGuards(AccessTokenGuard)
@ApiBearerAuth('access-token')
export class InbodyController {
  constructor(private readonly inbodyService: InbodyService) {}

  @Post()
  @ApiOperation({
    summary: '인바디 기록 생성',
  })
  @ApiResponse({
    status: 201,
    type: InbodyRecordResponseDto,
  })
  @ApiResponse({
    status: 401,
    description: ERROR_MESSAGE.UNAUTHORIZED,
  })
  async create(
    @Request() req: Express.Request,
    @Body() createDto: CreateInbodyRecordDto,
  ): Promise<InbodyRecordResponseDto> {
    const userId = req.user?.sub;
    if (!userId) {
      throw new UnauthorizedException(ERROR_MESSAGE.USER_NOT_FOUND);
    }
    return this.inbodyService.create(userId, createDto);
  }

  @Get()
  @ApiOperation({
    summary: '인바디 기록 전체 조회',
    description: '현재 사용자의 모든 인바디 기록을 최신순으로 조회합니다.',
  })
  @ApiResponse({
    status: 200,
    type: [InbodyRecordResponseDto],
  })
  @ApiResponse({
    status: 401,
    description: ERROR_MESSAGE.UNAUTHORIZED,
  })
  async findAll(
    @Request() req: Express.Request,
  ): Promise<InbodyRecordResponseDto[]> {
    const userId = req.user?.sub;
    if (!userId) {
      throw new UnauthorizedException(ERROR_MESSAGE.USER_NOT_FOUND);
    }
    return this.inbodyService.findAll(userId);
  }

  @Get(':id')
  @ApiOperation({
    summary: '인바디 기록 단일 조회',
    description: '특정 인바디 기록의 상세 정보를 조회합니다.',
  })
  @ApiResponse({
    status: 200,
    type: InbodyRecordResponseDto,
  })
  @ApiResponse({
    status: 401,
    description: ERROR_MESSAGE.UNAUTHORIZED,
  })
  @ApiResponse({
    status: 404,
    description: INBODY_ERROR_MESSAGE.INBODY_RECORD_NOT_FOUND,
  })
  async findOne(
    @Request() req: Express.Request,
    @Param('id') id: string,
  ): Promise<InbodyRecordResponseDto> {
    const userId = req.user?.sub;
    if (!userId) {
      throw new UnauthorizedException(ERROR_MESSAGE.USER_NOT_FOUND);
    }
    return this.inbodyService.findOne(id, userId);
  }

  @Patch(':id')
  @ApiOperation({
    summary: '인바디 기록 수정',
    description: '기존 인바디 기록의 정보를 수정합니다.',
  })
  @ApiResponse({
    status: 200,
    description: '인바디 기록이 성공적으로 수정되었습니다.',
    type: InbodyRecordResponseDto,
  })
  @ApiResponse({
    status: 401,
    description: ERROR_MESSAGE.UNAUTHORIZED,
  })
  @ApiResponse({
    status: 404,
    description: INBODY_ERROR_MESSAGE.INBODY_RECORD_NOT_FOUND,
  })
  async update(
    @Request() req: Express.Request,
    @Param('id') id: string,
    @Body() updateDto: UpdateInbodyRecordDto,
  ): Promise<InbodyRecordResponseDto> {
    const userId = req.user?.sub;
    if (!userId) {
      throw new UnauthorizedException(ERROR_MESSAGE.USER_NOT_FOUND);
    }
    return this.inbodyService.update(id, userId, updateDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: '인바디 기록 삭제',
    description: '특정 인바디 기록을 삭제합니다.',
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
    description: INBODY_ERROR_MESSAGE.INBODY_RECORD_NOT_FOUND,
  })
  async remove(
    @Request() req: Express.Request,
    @Param('id') id: string,
  ): Promise<void> {
    const userId = req.user?.sub;
    if (!userId) {
      throw new UnauthorizedException(ERROR_MESSAGE.USER_NOT_FOUND);
    }
    return this.inbodyService.remove(id, userId);
  }
}
