import { ApiProperty } from '@nestjs/swagger';
import { GoalProfileResponseDto } from '../../goal/dto/goal-profile-response.dto';
import { InbodyRecordResponseDto } from '../../inbody/dto/inbody-record-response.dto';
import { OneRmAllResponseDto } from 'src/one-rm/dto/one-rm-all-response.dto';

export class DashboardResponseDto {
  @ApiProperty({
    description: '가장 최근 목표 프로필',
    type: GoalProfileResponseDto,
    nullable: true,
  })
  latestGoal: GoalProfileResponseDto | null;

  @ApiProperty({
    description: '가장 최근 인바디 기록',
    type: InbodyRecordResponseDto,
    nullable: true,
  })
  latestInbody: InbodyRecordResponseDto | null;

  @ApiProperty({
    description: '가장 최근 1RM 기록',
    type: OneRmAllResponseDto,
    nullable: true,
  })
  latestOneRm: OneRmAllResponseDto | null;
}
