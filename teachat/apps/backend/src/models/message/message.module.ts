import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UserModule } from '../user/user.module';
import { ChatModule } from '../chat/chat.module';
import { MessageController } from './controllers/message.controller';
import { MessageGateway } from './gateways/message.gateway';
import { MessageService } from './services/message.service';

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
    ChatModule,
  ],
  controllers: [MessageController],
  providers: [MessageService, MessageGateway],
  exports: [],
})
export class MessageModule {}
