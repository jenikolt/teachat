import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { ChatEntity } from './chat.entity';
import { MessageEntity } from './message.entity';
import { ChatParticipantsEntity } from './chat-participants.entity';

@Entity()
export class UserEntity {
  @CreateDateColumn({ type: 'timestamptz' })
  createdOn: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedOn: Date;

  @PrimaryGeneratedColumn()
  @ApiProperty({ description: 'User id', nullable: false })
  id: number;

  @Column({ unique: true })
  @IsNotEmpty()
  @ApiProperty({ description: 'User name', nullable: false })
  username: string;

  @Column()
  password: string;

  @Column({ default: false })
  isAdmin: boolean;

  @OneToMany(() => ChatEntity, (chat) => chat.createdBy)
  chats: ChatEntity[];

  @OneToMany(() => MessageEntity, (message) => message.author)
  messages: MessageEntity[];

  @OneToMany(() => ChatParticipantsEntity, (participants) => participants.user)
  chatParticipant: ChatParticipantsEntity[];
}
