import { Injectable } from '@nestjs/common';
import { CreateMessageDto } from '../dto/create-message.dto';

@Injectable()
export class MessageRepository {
  constructor() {}

  async create(createMessageDto: CreateMessageDto): Promise<any> {}
}
