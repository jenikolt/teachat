import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';

export class RegisterDto {
  @IsString()
  @Length(1, 250)
  @ApiProperty({ description: 'First Name', nullable: false })
  username: string;

  @IsString()
  @Length(6, 100)
  @ApiProperty({ description: 'Password', nullable: false })
  password: string;
}
