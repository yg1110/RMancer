import { ApiProperty } from '@nestjs/swagger';
import { GoalProfileResponseDto } from '../../goal/dto/goal-profile-response.dto';
import { InbodyRecordResponseDto } from '../../inbody/dto/inbody-record-response.dto';
import { OneRmRecordResponseDto } from '../../one-rm/dto/one-rm-record-response.dto';

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
    type: OneRmRecordResponseDto,
    nullable: true,
  })
  latestOneRm: OneRmRecordResponseDto | null;
}
