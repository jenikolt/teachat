import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from './ormconfig';
import { AuthModule } from './models/auth/auth.module';
import { ChatModule } from './models/chat/chat.module';
import { ChatParticipantsModule } from './models/chat-participants/chat-participants.module';
import { MessageModule } from './models/message/message.module';

const modules = [AuthModule, ChatModule, ChatParticipantsModule, MessageModule];

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot(config),
    ...modules,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
