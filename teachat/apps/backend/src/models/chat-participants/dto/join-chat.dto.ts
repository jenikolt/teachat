import { IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class JoinChatDto {
  @IsNumber()
  @ApiProperty({ description: 'Chat id', nullable: false })
  chatId: number;
}
