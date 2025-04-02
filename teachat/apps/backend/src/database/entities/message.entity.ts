import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { AbstractEntity } from '../../shared/entities/abstract.entity';
import { UserEntity } from './user.entity';
import { ChatEntity } from './chat.entity';

@Entity()
export class MessageEntity extends AbstractEntity {
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: 'Message id', nullable: false })
  id: number;

  @Column()
  @IsNotEmpty()
  @ApiProperty({ description: 'Message text' })
  text: string;

  @ApiProperty({ type: () => UserEntity, description: 'Message author' })
  @ManyToOne(() => UserEntity, (user) => user.messages)
  @IsNotEmpty()
  author: UserEntity;

  @ManyToOne(() => ChatEntity, (chat) => chat.messages)
  @IsNotEmpty()
  chat: ChatEntity;
}
