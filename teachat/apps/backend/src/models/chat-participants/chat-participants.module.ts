import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UserModule } from '../user/user.module';
import { ChatParticipantsController } from './controllers/chat-participants.controller';
import { ChatParticipantsService } from './services/chat-participant.service';
import { ChatParticipantsRepository } from './repositories/chat-participants.repository';
import { ChatParticipantsGateway } from './gateways/chat-participant.gateway';

@Module({
  imports: [
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return {
          secret: configService.get<string>('JWT_SECRET'),
          signOptions: { expiresIn: '24h' },
        };
      },
    }),
    UserModule,
  ],
  controllers: [ChatParticipantsController],
  providers: [
    ChatParticipantsService,
    ChatParticipantsRepository,
    ChatParticipantsGateway,
  ],
  exports: [ChatParticipantsRepository],
})
export class ChatParticipantsModule {}
