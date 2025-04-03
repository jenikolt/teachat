import { BadRequestException, Injectable } from '@nestjs/common';
import { appDataSource } from '../../../ormconfig';
import { plainToInstance } from 'class-transformer';
import { UserRepository } from '../../user/repositories/user.repository';
import { CreateMessageDto } from '../dto/create-message.dto';
import { MessageEntity, ChatEntity } from '../../../database/entities';

@Injectable()
export class MessageService {
  constructor(private readonly userRepository: UserRepository) {}

  async create(
    userId: number,
    chatCreateDto: CreateMessageDto,
  ): Promise<MessageEntity> {
    const { chatId, text } = chatCreateDto;
    const author = await this.userRepository.getUserById(userId);
    const chat = await appDataSource
      .getRepository(ChatEntity)
      .findOne({ where: { id: chatId } });

    if (!author || !chat || !text) {
      throw new BadRequestException('Bad Request');
    }

    const { raw } = await appDataSource
      .getRepository(MessageEntity)
      .createQueryBuilder()
      .insert()
      .values({ author, chat, text })
      .execute();
    const [message] = raw;
    const { username, id } = author;
    const { created_on: createdOn, updated_on: updatedOn } = message;

    return plainToInstance(MessageEntity, {
      id: message.id,
      text,
      createdOn,
      updatedOn,
      chatId: chatId,
      author: { username, id },
    });
  }
}
