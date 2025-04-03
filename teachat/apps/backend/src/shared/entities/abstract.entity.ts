import { BaseEntity, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

export abstract class AbstractEntity extends BaseEntity {
  @ApiProperty({ description: 'Created on' })
  @CreateDateColumn({ type: 'timestamptz' })
  createdOn: Date;

  @ApiProperty({ description: 'Updated on' })
  @UpdateDateColumn({ type: 'timestamptz' })
  updatedOn: Date;
}
