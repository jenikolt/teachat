import { IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class InviteUserDTO {
  @IsNumber()
  @ApiProperty({ description: 'User id', nullable: false })
  userId: number;

  @IsNumber()
  @ApiProperty({ description: 'Chat id', nullable: false })
  chatId: number;
}
