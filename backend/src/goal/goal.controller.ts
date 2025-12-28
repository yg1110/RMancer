import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
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
import { GoalProfileService } from './goal.service';
import { CreateGoalProfileDto } from './dto/create-goal-profile.dto';
import { UpdateGoalProfileDto } from './dto/update-goal-profile.dto';
import { GoalProfileResponseDto } from './dto/goal-profile-response.dto';
import { AccessTokenGuard } from '../auth/guards/access-token.guard';
import { ERROR_MESSAGE } from 'src/common/error.constants';
import { GOAL_PROFILE_ERROR_MESSAGE } from './goal.constants';

@ApiTags('목표 프로필')
@Controller('goal-profile')
@UseGuards(AccessTokenGuard)
@ApiBearerAuth('access-token')
export class GoalProfileController {
  constructor(private readonly goalProfileService: GoalProfileService) {}

  @Post()
  @ApiOperation({
    summary: '목표 프로필 생성',
    description: '사용자의 목표 프로필을 생성합니다.',
  })
  @ApiResponse({
    status: 201,
    type: GoalProfileResponseDto,
  })
  @ApiResponse({
    status: 401,
    description: ERROR_MESSAGE.UNAUTHORIZED,
  })
  async create(
    @Request() req: Express.Request,
    @Body() createDto: CreateGoalProfileDto,
  ): Promise<GoalProfileResponseDto> {
    const userId = req.user?.sub;
    if (!userId) {
      throw new UnauthorizedException(ERROR_MESSAGE.USER_NOT_FOUND);
    }
    return this.goalProfileService.create(userId, createDto);
  }

  @Get()
  @ApiOperation({
    summary: '목표 프로필 조회',
    description: '현재 사용자의 목표 프로필을 조회합니다.',
  })
  @ApiResponse({
    status: 200,
    type: GoalProfileResponseDto,
  })
  @ApiResponse({
    status: 401,
    description: ERROR_MESSAGE.UNAUTHORIZED,
  })
  @ApiResponse({
    status: 404,
    description: GOAL_PROFILE_ERROR_MESSAGE.GOAL_PROFILE_NOT_FOUND,
  })
  async findOne(
    @Request() req: Express.Request,
  ): Promise<GoalProfileResponseDto> {
    const userId = req.user?.sub;
    if (!userId) {
      throw new UnauthorizedException(ERROR_MESSAGE.USER_NOT_FOUND);
    }
    return this.goalProfileService.findOne(userId);
  }

  @Patch()
  @ApiOperation({
    summary: '목표 프로필 수정',
    description: '기존 목표 프로필의 정보를 수정합니다.',
  })
  @ApiResponse({
    status: 200,
    description: '목표 프로필이 성공적으로 수정되었습니다.',
    type: GoalProfileResponseDto,
  })
  @ApiResponse({
    status: 401,
    description: ERROR_MESSAGE.UNAUTHORIZED,
  })
  @ApiResponse({
    status: 404,
    description: GOAL_PROFILE_ERROR_MESSAGE.GOAL_PROFILE_NOT_FOUND,
  })
  async update(
    @Request() req: Express.Request,
    @Body() updateDto: UpdateGoalProfileDto,
  ): Promise<GoalProfileResponseDto> {
    const userId = req.user?.sub;
    if (!userId) {
      throw new UnauthorizedException(ERROR_MESSAGE.USER_NOT_FOUND);
    }
    return this.goalProfileService.update(userId, updateDto);
  }

  @Delete()
  @ApiOperation({
    summary: '목표 프로필 삭제',
    description: '현재 사용자의 목표 프로필을 삭제합니다.',
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
    description: GOAL_PROFILE_ERROR_MESSAGE.GOAL_PROFILE_NOT_FOUND,
  })
  async remove(@Request() req: Express.Request): Promise<void> {
    const userId = req.user?.sub;
    if (!userId) {
      throw new UnauthorizedException(ERROR_MESSAGE.USER_NOT_FOUND);
    }
    return this.goalProfileService.remove(userId);
  }
}
