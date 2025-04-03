import { Controller, Get, UseGuards } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from '../../auth/guards/auth.guard';
import { UserService } from '../services/user.service';
import { UserEntity } from '../../../database/entities';

@UseGuards(AuthGuard)
@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiOperation({ summary: 'Get all users' })
  @ApiOkResponse({ type: UserEntity, isArray: true })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  async getAllUsers(): Promise<UserEntity[]> {
    return await this.userService.getAll();
  }
}
