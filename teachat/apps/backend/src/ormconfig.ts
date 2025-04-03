import * as dotenv from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import {
  ChatEntity,
  ChatParticipantsEntity,
  MessageEntity,
  UserEntity,
} from './database/entities';

dotenv.config();

const entities = [
  ChatEntity,
  ChatParticipantsEntity,
  MessageEntity,
  UserEntity,
];

export const config: DataSourceOptions = {
  url: process.env.DB_URL,
  type: 'postgres',
  entities: entities,
  namingStrategy: new SnakeNamingStrategy(),
  synchronize: true,
  migrationsRun: true,
  logging: true,
  logger: 'file',
  migrations: [`${__dirname}/database/migrations/*.ts`],
};

export const appDataSource = new DataSource(config);
const main = async () => {
  await appDataSource.initialize();
};

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
