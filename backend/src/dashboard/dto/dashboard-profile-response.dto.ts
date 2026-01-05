import { ApiProperty } from '@nestjs/swagger';
import { GoalProfileResponseDto } from '../../goal/dto/goal-profile-response.dto';
import { InbodyRecordResponseDto } from '../../inbody/dto/inbody-record-response.dto';
import { OneRmRecordResponseDto } from '../../one-rm/dto/one-rm-record-response.dto';

export class DashboardProfileResponseDto {
  @ApiProperty({
    description: '생성/수정된 목표 프로필',
    type: GoalProfileResponseDto,
  })
  goalProfile: GoalProfileResponseDto;

  @ApiProperty({
    description: '생성된 인바디 기록',
    type: InbodyRecordResponseDto,
  })
  inbodyRecord: InbodyRecordResponseDto;

  @ApiProperty({
    description: '생성된 1RM 기록 목록',
    type: [OneRmRecordResponseDto],
  })
  oneRmRecords: OneRmRecordResponseDto[];
}
