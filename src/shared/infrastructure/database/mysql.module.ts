import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DivisionSchema } from '../../../division/infrastructure/persistence/division.schema';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '123456789',
      database: 'mandu_divisions',
      entities: [DivisionSchema],
      synchronize: true,
    }),
  ],
})
export class MySqlModule {}
