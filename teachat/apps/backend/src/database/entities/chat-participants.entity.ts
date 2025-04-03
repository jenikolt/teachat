import {
  BaseEntity,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { UserEntity } from './user.entity';
import { ChatEntity } from './chat.entity';

@Entity()
export class ChatParticipantsEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: 'Chat participant id', nullable: false })
  id: number;

  @CreateDateColumn()
  joinedAt: Date;

  @ManyToOne(() => UserEntity, (user) => user.chatParticipant)
  @IsNotEmpty()
  user: UserEntity;

  @ManyToOne(() => ChatEntity, (chat) => chat.participants)
  @IsNotEmpty()
  chat: ChatEntity;
}
