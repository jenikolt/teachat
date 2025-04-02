import { BadRequestException, Injectable } from '@nestjs/common';
import { appDataSource } from '../../../ormconfig';
import { UserRepository } from '../../user/repositories/user.repository';
import { ChatParticipantsEntity, ChatEntity } from '../../../database/entities';
import { InviteUserDTO } from '../dto/invite-user.dto';
import { ChatParticipantsRepository } from '../repositories/chat-participants.repository';

@Injectable()
export class ChatParticipantsService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly chatParticipantsRepository: ChatParticipantsRepository,
  ) {}

  async join(userId: number, chatId: number): Promise<ChatParticipantsEntity> {
    const user = await this.userRepository.getUserById(userId);
    const chat = await appDataSource
      .getRepository(ChatEntity)
      .findOne({ where: { id: chatId } });
    if (!user || !chat) {
      throw new BadRequestException('Bad Request');
    }
    return await this.chatParticipantsRepository.create({ user, chat });
  }

  async invite(userId: number, inviteUserDTO: InviteUserDTO): Promise<void> {
    //TODO Нужно ли вообще?
  }

  async leave(userId: number, chatId: number): Promise<void> {
    const chatParticipantsEntity =
      this.chatParticipantsRepository.getByUserIdAndChatId(userId, chatId);
    if (!chatParticipantsEntity) {
      throw new BadRequestException('Chat not found');
    }

    await appDataSource
      .getRepository(ChatParticipantsEntity)
      .createQueryBuilder('chatParticipantsRepository')
      .leftJoin('chatParticipantsRepository.user', 'user')
      .leftJoin('chatParticipantsRepository.chat', 'chat')
      .where('user.id = :userId', { userId: userId })
      .andWhere('chat.id = :chatId', { chatId: chatId })
      .delete()
      .execute();
  }
}
