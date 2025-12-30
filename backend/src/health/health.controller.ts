import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Health Check')
@Controller('health')
export class HealthController {
  @Get()
  @ApiOperation({
    summary: '서버 상태 확인',
    description: '서버가 정상적으로 실행 중인지 확인합니다.',
  })
  @ApiResponse({
    status: 200,
    description: '서버가 정상적으로 실행 중입니다.',
    schema: {
      type: 'object',
      properties: {
        status: {
          type: 'string',
          example: 'ok',
        },
        timestamp: {
          type: 'string',
          example: '2024-01-01T00:00:00.000Z',
        },
      },
    },
  })
  check() {
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
    };
  }
}
