import { BadRequestException, Injectable } from '@nestjs/common';
import { appDataSource } from '../../../ormconfig';
import { plainToInstance } from 'class-transformer';
import { ChatParticipantsRepository } from '../../chat-participants/repositories/chat-participants.repository';
import { UserRepository } from '../../user/repositories/user.repository';
import { CreateChatDto } from '../dto/create-chat.dto';
import {
  ChatParticipantsEntity,
  MessageEntity,
  ChatEntity,
} from '../../../database/entities';

@Injectable()
export class ChatService {
  constructor(
    private readonly chatParticipantsRepository: ChatParticipantsRepository,
    private readonly userRepository: UserRepository,
  ) {}

  async create(userId: number, chatCreateDto: CreateChatDto): Promise<void> {
    const { name, isGroup } = chatCreateDto;
    const user = await this.userRepository.getUserById(userId);
    if (!user) {
      throw new BadRequestException('User not found');
    }

    const { raw } = await appDataSource
      .getRepository(ChatEntity)
      .createQueryBuilder()
      .insert()
      .values({ name, isGroup, createdBy: user })
      .execute();
    const [chat] = raw;

    if (!chat) {
      throw new BadRequestException('Bad Request');
    }

    await this.chatParticipantsRepository.create({ chat, user });
  }

  async getAllMyChats(userId: number): Promise<ChatEntity[]> {
    const result = await appDataSource
      .getRepository(ChatParticipantsEntity)
      .createQueryBuilder('chatParticipantsEntity')
      .leftJoinAndSelect('chatParticipantsEntity.chat', 'chat')
      .leftJoinAndSelect('chat.participants', 'participants')
      .leftJoin('participants.user', 'user')
      .leftJoin(
        (qb) =>
          qb
            .select()
            .from(MessageEntity, 'messages')
            .orderBy('messages.updated_on', 'ASC'),
        'messages_',
        'messages_.chat_id = chat.id',
      )
      .leftJoinAndMapOne(
        'chat.lastMessage',
        MessageEntity,
        'messages',
        'messages.id = messages_.id',
      )
      .leftJoin('messages.author', 'author')
      .addSelect(['user.id', 'user.username', 'author.id', 'author.username'])
      .where('chatParticipantsEntity.user_id = :userId', { userId })
      .getMany();

    return result.map(({ chat }) =>
      plainToInstance(ChatEntity, { ...chat, isParticipant: true }),
    );
  }

  async getChatsBySearch(
    userId: number,
    search: string,
  ): Promise<ChatEntity[]> {
    const result = await appDataSource
      .getRepository(ChatEntity)
      .createQueryBuilder('chat')
      .leftJoin('chat.participants', 'participants')
      .leftJoin('participants.user', 'user')
      .leftJoin(
        (qb) =>
          qb
            .select()
            .from(MessageEntity, 'messages')
            .orderBy('messages.updated_on', 'ASC'),
        'messages_',
        'messages_.chat_id = chat.id',
      )
      .leftJoinAndMapOne(
        'chat.lastMessage',
        MessageEntity,
        'messages',
        'messages.id = messages_.id',
      )
      .leftJoin('messages.author', 'author')
      .addSelect([
        'participants',
        'user.id',
        'user.username',
        'author.id',
        'author.username',
      ])
      .where('is_group = :isGroup', { isGroup: true })
      .andWhere('(chat.name ILIKE :search)', { search: `%${search}%` })
      .getMany();

    return result.map((chat) =>
      plainToInstance(ChatEntity, {
        ...chat,
        isParticipant: chat.participants.length
          ? chat.participants.some(
              (participant) => participant.user.id === userId,
            )
          : false,
      }),
    );
  }

  async getChatById(userId: number, chatId: number): Promise<ChatEntity> {
    const chat = await appDataSource
      .getRepository(ChatEntity)
      .createQueryBuilder('chat')
      .where('chat.id = :chatId', { chatId })
      .leftJoin('chat.messages', 'messages')
      .leftJoin('chat.participants', 'participants')
      .leftJoin('participants.user', 'user')
      .leftJoin('messages.author', 'author')
      .select([
        'participants',
        'chat',
        'messages',
        'author.id',
        'author.username',
        'user.id',
        'user.username',
      ])
      .orderBy('messages.createdOn', 'ASC')
      .getOne();

    if (!chat) {
      throw new BadRequestException('Bad Request');
    }

    return plainToInstance(ChatEntity, {
      ...chat,
      isParticipant: chat.participants.length
        ? chat.participants.some(
            (participant) => participant.user.id === userId,
          )
        : false,
    });
  }
}
