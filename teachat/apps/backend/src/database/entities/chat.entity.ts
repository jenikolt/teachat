import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { AbstractEntity } from '../../shared/entities/abstract.entity';
import { UserEntity } from './user.entity';
import { ChatParticipantsEntity } from './chat-participants.entity';
import { MessageEntity } from './message.entity';

@Entity()
export class ChatEntity extends AbstractEntity {
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: 'Chat id', nullable: false })
  id: number;

  @Column()
  @ApiProperty({ description: 'Chat name' })
  name: string;

  @Column({ default: false })
  @ApiProperty({ description: 'Is group chat' })
  isGroup: boolean;

  @ManyToOne(() => UserEntity, (user) => user.chats)
  @IsNotEmpty()
  createdBy: UserEntity;

  @OneToMany(() => ChatParticipantsEntity, (participants) => participants.chat)
  participants: ChatParticipantsEntity[];

  @OneToMany(() => MessageEntity, (message) => message.chat)
  messages: MessageEntity[];

  @ApiProperty({ description: 'Chat last message', nullable: true })
  lastMessage: MessageEntity;

  @ApiProperty({ description: 'Is participant chat', nullable: true })
  isParticipant: boolean;
}
