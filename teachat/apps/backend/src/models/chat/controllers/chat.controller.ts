import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOperation,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import {
  Body,
  Controller,
  Post,
  UseGuards,
  Request,
  Get,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { AuthGuard } from '../../auth/guards/auth.guard';
import { ChatService } from '../services/chat.service';
import { CreateChatDto } from '../dto/create-chat.dto';
import { ChatEntity } from '../../../database/entities';

@UseGuards(AuthGuard)
@ApiTags('Chat')
@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post('create')
  @ApiOperation({ summary: 'Create chat' })
  @ApiCreatedResponse({ description: 'Success' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  async create(
    @Request() { userId },
    @Body() chatCreateDto: CreateChatDto,
  ): Promise<void> {
    await this.chatService.create(userId, chatCreateDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all my chats' })
  @ApiOkResponse({ type: ChatEntity, isArray: true })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  async getAllMyChats(@Request() { userId }): Promise<ChatEntity[]> {
    return await this.chatService.getAllMyChats(userId);
  }

  @Get('search/:search')
  @ApiOperation({ summary: 'Get list group chats by search' })
  @ApiOkResponse({ type: ChatEntity, isArray: true })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  async getChatsBySearch(
    @Request() { userId },
    @Param('search') search: string,
  ): Promise<ChatEntity[]> {
    return await this.chatService.getChatsBySearch(userId, search);
  }

  @Get(':chatId')
  @ApiOperation({ summary: 'Get all my chats' })
  @ApiOkResponse({ type: ChatEntity })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  async getChatById(
    @Request() { userId },
    @Param('chatId', ParseIntPipe) chatId: number,
  ): Promise<ChatEntity> {
    return await this.chatService.getChatById(userId, chatId);
  }
}
