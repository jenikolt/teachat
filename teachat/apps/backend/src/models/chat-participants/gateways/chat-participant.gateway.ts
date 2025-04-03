import {
  ConnectedSocket,
  GatewayMetadata,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { BadRequestException, Request, UseGuards } from '@nestjs/common';
import { WsGuard } from '../../auth/guards/ws.guard';
import { ChatParticipantsService } from '../services/chat-participant.service';
import { UserRepository } from '../../user/repositories/user.repository';
import { CreateMessageDto } from '../../message/dto/create-message.dto';

@UseGuards(WsGuard)
@WebSocketGateway<GatewayMetadata>({
  cors: {
    origin: '*',
  },
})
export class ChatParticipantsGateway {
  constructor(
    private readonly chatParticipantsService: ChatParticipantsService,
    private readonly userRepository: UserRepository,
  ) {}

  @WebSocketServer()
  server: Socket;

  @SubscribeMessage('join')
  async handleEvent(
    @Request() { userId },
    @MessageBody() joinChatDto: CreateMessageDto,
    @ConnectedSocket() client: Socket,
  ): Promise<void> {
    const user = await this.userRepository.getUserById(userId);
    if (!user) {
      throw new BadRequestException(' Bad request');
    }
    const message = await this.chatParticipantsService.join(
      userId,
      joinChatDto.chatId,
    );

    client.join(`chat:${joinChatDto.chatId}`);
    client.to(`chat:${joinChatDto.chatId.toString()}`).emit('join', {
      ...message,
      user: { id: userId, username: user.username },
    });
  }
}
