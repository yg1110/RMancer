import {
  Controller,
  Get,
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
}
