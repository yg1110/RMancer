import {
  Controller,
  Get,
  Post,
  Body,
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
import { DashboardService } from './dashboard.service';
import { DashboardResponseDto } from './dto/dashboard-response.dto';
import { CreateDashboardProfileDto } from './dto/create-dashboard-profile.dto';
import { DashboardProfileResponseDto } from './dto/dashboard-profile-response.dto';
import { AccessTokenGuard } from '../auth/guards/access-token.guard';
import { ERROR_MESSAGE } from '../common/error.constants';

@ApiTags('대시보드')
@Controller('dashboard')
@UseGuards(AccessTokenGuard)
@ApiBearerAuth('access-token')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get()
  @ApiOperation({
    summary: '대시보드 데이터 조회',
    description: '가장 최근의 목표, 인바디, 1RM 정보를 조회합니다.',
  })
  @ApiResponse({
    status: 200,
    type: DashboardResponseDto,
  })
  @ApiResponse({
    status: 401,
    description: ERROR_MESSAGE.UNAUTHORIZED,
  })
  async getLatestData(
    @Request() req: Express.Request,
  ): Promise<DashboardResponseDto> {
    const userId = req.user?.sub;
    if (!userId) {
      throw new UnauthorizedException(ERROR_MESSAGE.USER_NOT_FOUND);
    }
    return this.dashboardService.getLatestData(userId);
  }

  @Post('profile-with-records')
  @ApiOperation({
    summary: '프로필 및 기록 일괄 생성 (트랜잭션)',
    description:
      '목표 프로필, 인바디 기록, 1RM 기록을 트랜잭션으로 안전하게 생성합니다. 하나라도 실패하면 모든 작업이 롤백됩니다.',
  })
  @ApiResponse({
    status: 201,
    type: DashboardProfileResponseDto,
    description: '성공적으로 생성되었습니다.',
  })
  @ApiResponse({
    status: 401,
    description: ERROR_MESSAGE.UNAUTHORIZED,
  })
  @ApiResponse({
    status: 500,
    description: '프로필 및 기록 생성에 실패했습니다.',
  })
  async createProfileWithRecords(
    @Request() req: Express.Request,
    @Body() createDto: CreateDashboardProfileDto,
  ): Promise<DashboardProfileResponseDto> {
    const userId = req.user?.sub;
    if (!userId) {
      throw new UnauthorizedException(ERROR_MESSAGE.USER_NOT_FOUND);
    }
    return this.dashboardService.createProfileWithRecords(userId, createDto);
  }
}
