import { IsBoolean, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateChatDto {
  @IsString()
  @ApiProperty({ description: 'Chat name', nullable: false })
  name: string;

  @IsBoolean()
  @ApiProperty({ description: 'Is group chat', nullable: true, default: false })
  isGroup: boolean = false;
}
