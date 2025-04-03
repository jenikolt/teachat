import {
  GatewayMetadata,
  MessageBody,
  OnGatewayConnection,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { JwtService } from '@nestjs/jwt';
import { Request, UseGuards } from '@nestjs/common';
import { WsGuard } from '../../auth/guards/ws.guard';
import { MessageService } from '../services/message.service';
import { ChatService } from '../../chat/services/chat.service';
import { decode } from '../../../shared/utils/token.decode';
import { CreateMessageDto } from '../dto/create-message.dto';

@UseGuards(WsGuard)
@WebSocketGateway<GatewayMetadata>({
  cors: {
    origin: '*',
  },
})
export class MessageGateway implements OnGatewayInit, OnGatewayConnection {
  constructor(
    private readonly messageService: MessageService,
    private readonly chatService: ChatService,
    private readonly jwtService: JwtService,
  ) {}

  async handleConnection(client: Socket) {
    const { authorization } = client.handshake.headers;
    if (!authorization) {
      client.disconnect();
      return;
    }
    const userId = await decode(authorization, this.jwtService);
    const chats = await this.chatService.getAllMyChats(userId);
    client.join(chats.map(({ id }) => `chat:${id}`));
  }

  afterInit(client: Socket) {}

  @WebSocketServer()
  server: Socket;

  @SubscribeMessage('message')
  async handleEvent(
    @Request() { userId },
    @MessageBody() data: CreateMessageDto,
  ): Promise<void> {
    const message = await this.messageService.create(userId, data);
    this.server
      .to(`chat:${data.chatId.toString()}`)
      .emit('new_message', message);
  }
}
