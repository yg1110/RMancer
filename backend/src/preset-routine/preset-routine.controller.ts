import {
  Controller,
  Get,
  UseGuards,
  Request,
  UnauthorizedException,
  Body,
  Post,
  Param,
} from '@nestjs/common';
import {
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiTags,
  ApiBody,
} from '@nestjs/swagger';
import {
  PresetRoutineService,
  PresetRoutineType,
} from './preset-routine.service';
import { CreateRoutineDto } from '../routine/dto/create-routine.dto';
import { PresetRoutineListItemDto } from './dto/preset-routine-list-item.dto';
import { AccessTokenGuard } from '../auth/guards/access-token.guard';
import { ERROR_MESSAGE } from '../common/error.constants';
import { RoutineResponseDto } from 'src/routine/dto/routine-response.dto';

@ApiTags('프리셋 루틴')
@Controller('preset-routines')
@UseGuards(AccessTokenGuard)
@ApiBearerAuth('access-token')
export class PresetRoutineController {
  constructor(private readonly presetRoutineService: PresetRoutineService) {}

  @Get()
  @ApiOperation({
    summary: '프리셋 루틴 목록 조회',
    description: '모든 프리셋 루틴의 목록을 조회합니다.',
  })
  @ApiResponse({
    status: 200,
    type: [PresetRoutineListItemDto],
  })
  @ApiResponse({
    status: 401,
    description: ERROR_MESSAGE.UNAUTHORIZED,
  })
  async getAllPresetRoutines(
    @Request() req: Express.Request,
  ): Promise<PresetRoutineListItemDto[]> {
    const userId = req.user?.sub;
    if (!userId) {
      throw new UnauthorizedException(ERROR_MESSAGE.USER_NOT_FOUND);
    }
    return this.presetRoutineService.getAllPresetRoutines();
  }

  @Get('beginner')
  @ApiOperation({
    summary: '초보자용 루틴 조회',
    description: '초보자를 위한 프리셋 루틴을 조회합니다.',
  })
  @ApiResponse({
    status: 200,
    type: CreateRoutineDto,
  })
  @ApiResponse({
    status: 401,
    description: ERROR_MESSAGE.UNAUTHORIZED,
  })
  async getBeginnerRoutine(
    @Request() req: Express.Request,
  ): Promise<CreateRoutineDto> {
    const userId = req.user?.sub;
    if (!userId) {
      throw new UnauthorizedException(ERROR_MESSAGE.USER_NOT_FOUND);
    }
    return this.presetRoutineService.getBeginnerRoutine();
  }

  @Get('intermediate')
  @ApiOperation({
    summary: '중급자용 루틴 조회',
    description: '중급자를 위한 프리셋 루틴을 조회합니다.',
  })
  @ApiResponse({
    status: 200,
    type: CreateRoutineDto,
  })
  @ApiResponse({
    status: 401,
    description: ERROR_MESSAGE.UNAUTHORIZED,
  })
  async getIntermediateRoutine(
    @Request() req: Express.Request,
  ): Promise<CreateRoutineDto> {
    const userId = req.user?.sub;
    if (!userId) {
      throw new UnauthorizedException(ERROR_MESSAGE.USER_NOT_FOUND);
    }
    return this.presetRoutineService.getIntermediateRoutine();
  }

  @Get('advanced')
  @ApiOperation({
    summary: '상급자용 루틴 조회',
    description: '상급자를 위한 프리셋 루틴을 조회합니다.',
  })
  @ApiResponse({
    status: 200,
    type: CreateRoutineDto,
  })
  @ApiResponse({
    status: 401,
    description: ERROR_MESSAGE.UNAUTHORIZED,
  })
  async getAdvancedRoutine(
    @Request() req: Express.Request,
  ): Promise<CreateRoutineDto> {
    const userId = req.user?.sub;
    if (!userId) {
      throw new UnauthorizedException(ERROR_MESSAGE.USER_NOT_FOUND);
    }
    return this.presetRoutineService.getAdvancedRoutine();
  }

  @Get('strength')
  @ApiOperation({
    summary: '근력증가용 루틴 조회',
    description: '근력증가를 위한 프리셋 루틴을 조회합니다.',
  })
  @ApiResponse({
    status: 200,
    type: CreateRoutineDto,
  })
  @ApiResponse({
    status: 401,
    description: ERROR_MESSAGE.UNAUTHORIZED,
  })
  async getStrengthRoutine(
    @Request() req: Express.Request,
  ): Promise<CreateRoutineDto> {
    const userId = req.user?.sub;
    if (!userId) {
      throw new UnauthorizedException(ERROR_MESSAGE.USER_NOT_FOUND);
    }
    return this.presetRoutineService.getStrengthRoutine();
  }

  @Get('fat-loss')
  @ApiOperation({
    summary: '체지방 감소용 루틴 조회',
    description: '체지방 감소를 위한 프리셋 루틴을 조회합니다.',
  })
  @ApiResponse({
    status: 200,
    type: CreateRoutineDto,
  })
  @ApiResponse({
    status: 401,
    description: ERROR_MESSAGE.UNAUTHORIZED,
  })
  async getFatLossRoutine(
    @Request() req: Express.Request,
  ): Promise<CreateRoutineDto> {
    const userId = req.user?.sub;
    if (!userId) {
      throw new UnauthorizedException(ERROR_MESSAGE.USER_NOT_FOUND);
    }
    return this.presetRoutineService.getFatLossRoutine();
  }

  @Post(':presetRoutineType')
  @ApiOperation({
    summary: '추천 루틴 생성',
    description: '추천 루틴을 생성합니다.',
  })
  @ApiResponse({
    status: 200,
    type: RoutineResponseDto,
  })
  @ApiResponse({
    status: 401,
    description: ERROR_MESSAGE.UNAUTHORIZED,
  })
  async createRecommendedRoutine(
    @Request() req: Express.Request,
    @Param('presetRoutineType') presetRoutineType: PresetRoutineType,
  ): Promise<RoutineResponseDto> {
    const userId = req.user?.sub;
    if (!userId) {
      throw new UnauthorizedException(ERROR_MESSAGE.USER_NOT_FOUND);
    }

    return this.presetRoutineService.createRecommendedRoutine(
      userId,
      presetRoutineType,
    );
  }
}
