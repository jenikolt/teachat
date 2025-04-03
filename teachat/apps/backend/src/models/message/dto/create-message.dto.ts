import { IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateMessageDto {
  @IsNumber()
  @ApiProperty({ description: 'Chat id', nullable: false })
  chatId: number;

  @IsString()
  @ApiProperty({ description: 'Message text', nullable: false })
  text: string;
}
