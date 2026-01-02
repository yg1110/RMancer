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
import { RoutineService } from './routine.service';
import { CreateRoutineDto } from './dto/create-routine.dto';
import { UpdateRoutineDto } from './dto/update-routine.dto';
import { RoutineResponseDto } from './dto/routine-response.dto';
import { AccessTokenGuard } from '../auth/guards/access-token.guard';
import { ERROR_MESSAGE } from 'src/common/error.constants';
import { ROUTINE_ERROR_MESSAGE } from './routine.constants';

@ApiTags('루틴')
@Controller('routines')
@UseGuards(AccessTokenGuard)
@ApiBearerAuth('access-token')
export class RoutineController {
  constructor(private readonly routineService: RoutineService) {}

  @Post()
  @ApiOperation({
    summary: '루틴 생성',
  })
  @ApiResponse({
    status: 201,
    type: RoutineResponseDto,
  })
  @ApiResponse({
    status: 401,
    description: ERROR_MESSAGE.UNAUTHORIZED,
  })
  async create(
    @Request() req: Express.Request,
    @Body() createDto: CreateRoutineDto,
  ): Promise<RoutineResponseDto> {
    const userId = req.user?.sub;
    if (!userId) {
      throw new UnauthorizedException(ERROR_MESSAGE.USER_NOT_FOUND);
    }
    return this.routineService.create(userId, createDto);
  }

  @Get()
  @ApiOperation({
    summary: '루틴 전체 조회',
    description: '현재 사용자의 모든 루틴을 최신순으로 조회합니다.',
  })
  @ApiResponse({
    status: 200,
    type: [RoutineResponseDto],
  })
  @ApiResponse({
    status: 401,
    description: ERROR_MESSAGE.UNAUTHORIZED,
  })
  async findAll(
    @Request() req: Express.Request,
  ): Promise<RoutineResponseDto[]> {
    const userId = req.user?.sub;
    if (!userId) {
      throw new UnauthorizedException(ERROR_MESSAGE.USER_NOT_FOUND);
    }
    return this.routineService.findAll(userId);
  }

  @Get(':id')
  @ApiOperation({
    summary: '루틴 단일 조회',
    description: '특정 루틴의 상세 정보를 조회합니다.',
  })
  @ApiResponse({
    status: 200,
    type: RoutineResponseDto,
  })
  @ApiResponse({
    status: 401,
    description: ERROR_MESSAGE.UNAUTHORIZED,
  })
  @ApiResponse({
    status: 404,
    description: ROUTINE_ERROR_MESSAGE.ROUTINE_NOT_FOUND,
  })
  async findOne(
    @Request() req: Express.Request,
    @Param('id') id: string,
  ): Promise<RoutineResponseDto> {
    const userId = req.user?.sub;
    if (!userId) {
      throw new UnauthorizedException(ERROR_MESSAGE.USER_NOT_FOUND);
    }
    return this.routineService.findOne(id, userId);
  }

  @Patch(':id')
  @ApiOperation({
    summary: '루틴 수정',
    description: '기존 루틴의 정보를 수정합니다.',
  })
  @ApiResponse({
    status: 200,
    description: '루틴이 성공적으로 수정되었습니다.',
    type: RoutineResponseDto,
  })
  @ApiResponse({
    status: 401,
    description: ERROR_MESSAGE.UNAUTHORIZED,
  })
  @ApiResponse({
    status: 404,
    description: ROUTINE_ERROR_MESSAGE.ROUTINE_NOT_FOUND,
  })
  async update(
    @Request() req: Express.Request,
    @Param('id') id: string,
    @Body() updateDto: UpdateRoutineDto,
  ): Promise<RoutineResponseDto> {
    const userId = req.user?.sub;
    if (!userId) {
      throw new UnauthorizedException(ERROR_MESSAGE.USER_NOT_FOUND);
    }
    return this.routineService.update(id, userId, updateDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: '루틴 삭제',
    description: '특정 루틴을 삭제합니다.',
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
    description: ROUTINE_ERROR_MESSAGE.ROUTINE_NOT_FOUND,
  })
  async remove(
    @Request() req: Express.Request,
    @Param('id') id: string,
  ): Promise<void> {
    const userId = req.user?.sub;
    if (!userId) {
      throw new UnauthorizedException(ERROR_MESSAGE.USER_NOT_FOUND);
    }
    return this.routineService.remove(id, userId);
  }

  @Post('generate')
  @ApiOperation({
    summary: '루틴 생성',
    description: '거인의 비밀 루틴을 생성합니다.',
  })
  @ApiResponse({
    status: 201,
    type: RoutineResponseDto,
  })
  @ApiResponse({
    status: 401,
    description: ERROR_MESSAGE.UNAUTHORIZED,
  })
  async generateRoutine(
    @Request() req: Express.Request,
  ): Promise<RoutineResponseDto> {
    const userId = req.user?.sub;
    if (!userId) {
      throw new UnauthorizedException(ERROR_MESSAGE.USER_NOT_FOUND);
    }
    return this.routineService.generateRoutine(userId);
  }

  @Get('latest')
  @ApiOperation({
    summary: '최신 루틴 조회',
    description: '현재 사용자의 최신 루틴을 조회합니다.',
  })
  @ApiResponse({
    status: 200,
    type: RoutineResponseDto,
  })
  async getLatestRoutine(
    @Request() req: Express.Request,
  ): Promise<RoutineResponseDto> {
    const userId = req.user?.sub;
    if (!userId) {
      throw new UnauthorizedException(ERROR_MESSAGE.USER_NOT_FOUND);
    }
    return this.routineService.getLatestRoutine(userId);
  }
}
