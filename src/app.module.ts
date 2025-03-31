import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DivisionModule } from './division/infrastructure/division.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DivisionSchema } from './division/infrastructure/persistence/division.schema';

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
    DivisionModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
