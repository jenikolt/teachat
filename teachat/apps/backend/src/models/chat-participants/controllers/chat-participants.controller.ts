import {
  ApiBadRequestResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import {
  Body,
  Controller,
  Post,
  UseGuards,
  Request,
  Param,
  ParseIntPipe,
  Delete,
} from '@nestjs/common';
import { AuthGuard } from '../../auth/guards/auth.guard';
import { ChatParticipantsService } from '../services/chat-participant.service';
import { InviteUserDTO } from '../dto/invite-user.dto';

@UseGuards(AuthGuard)
@ApiTags('Chat actions')
@Controller('chat')
export class ChatParticipantsController {
  constructor(
    private readonly chatParticipantsService: ChatParticipantsService,
  ) {}

  @ApiOperation({ summary: 'Leave chat' })
  @Delete('leave/:chatId')
  @ApiOkResponse({ description: 'Success' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  async leave(
    @Request() { userId },
    @Param('chatId', ParseIntPipe) chatId: number,
  ): Promise<void> {
    return this.chatParticipantsService.leave(userId, chatId);
  }

  @ApiOperation({ summary: 'Invite user to chat' })
  @Post('invite')
  @ApiOkResponse({ description: 'Success' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  async invite(
    @Request() { userId },
    @Body() inviteUserDTO: InviteUserDTO,
  ): Promise<void> {
    return this.chatParticipantsService.invite(userId, inviteUserDTO);
  }
}
