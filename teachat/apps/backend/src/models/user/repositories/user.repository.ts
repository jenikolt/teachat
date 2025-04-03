import { Injectable } from '@nestjs/common';
import { appDataSource } from '../../../ormconfig';
import { UserEntity } from '../../../database/entities';

@Injectable()
export class UserRepository {
  async getUserById(userId: number): Promise<UserEntity | null> {
    return await appDataSource
      .getRepository(UserEntity)
      .createQueryBuilder('userEntity')
      .select(['userEntity.id', 'userEntity.username'])
      .where('userEntity.id = :userId', { userId })
      .getOne();
  }

  async getAll(): Promise<UserEntity[]> {
    return await appDataSource
      .getRepository(UserEntity)
      .createQueryBuilder('userEntity')
      .select(['userEntity.id', 'userEntity.username'])
      .getMany();
  }
}
