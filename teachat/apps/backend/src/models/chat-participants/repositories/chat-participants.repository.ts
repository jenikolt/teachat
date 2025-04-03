import { ForbiddenException, Injectable } from '@nestjs/common';
import { appDataSource } from '../../../ormconfig';
import { ChatParticipantsEntity } from '../../../database/entities';

@Injectable()
export class ChatParticipantsRepository {
  constructor() {}

  async create(
    chatParticipantDto: Partial<ChatParticipantsEntity>,
  ): Promise<any> {
    const { user, chat } = chatParticipantDto;
    if (!user || !chat) {
      throw new ForbiddenException('Bad Request');
    }
    const existingChatUser = await this.getByUserIdAndChatId(user.id, chat.id);

    if (existingChatUser) {
      return Promise.resolve(existingChatUser);
    }

    return await appDataSource
      .getRepository(ChatParticipantsEntity)
      .save(chatParticipantDto);
  }

  async getByUserIdAndChatId(
    userId: number,
    chatId: number,
  ): Promise<ChatParticipantsEntity | null> {
    return await appDataSource
      .getRepository(ChatParticipantsEntity)
      .createQueryBuilder('chatParticipantsRepository')
      .leftJoin('chatParticipantsRepository.user', 'user')
      .leftJoin('chatParticipantsRepository.chat', 'chat')
      .where('user.id = :userId', { userId: userId })
      .andWhere('chat.id = :chatId', { chatId: chatId })
      .getOne();
  }
}
