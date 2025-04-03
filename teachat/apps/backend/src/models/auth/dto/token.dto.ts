import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class TokenDto {
  @IsString()
  @ApiProperty({ description: 'Access token' })
  accessToken: string;

  @IsString()
  @ApiProperty({ description: 'Refresh token' })
  refreshToken: string;
}
