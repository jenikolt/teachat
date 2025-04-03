import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';

export class LoginDto {
  @IsString()
  @ApiProperty({ description: 'User name', nullable: false })
  username: string;

  @IsString()
  @Length(6, 100)
  @ApiProperty({ description: 'Password', nullable: false })
  password: string;
}
