import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';

dotenv.config();

export const typeormOptions: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: process.env.POSTGRES_PW,
  database: 'quiz',
  entities: ['../modules/**/*.entity.ts'],
  synchronize: true, // Setting synchronize: true shouldn't be used in production - otherwise you can lose production data.
  autoLoadEntities: true,
};
