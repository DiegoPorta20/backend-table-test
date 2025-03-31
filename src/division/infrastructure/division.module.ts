import { Module } from '@nestjs/common';

import { DivisionSchema } from './persistence/division.schema';
import { DivisionController } from './controllers/division.controller';
import { DivisionService } from '../application/services/division.service';
import { MySqlDivisionRepository } from './repositories/mysql-division.repository';
import { DivisionRepository } from '../domain/repositories/division.repository.interface';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([DivisionSchema])],
  controllers: [DivisionController],
  providers: [
    DivisionService,
    {
      provide: DivisionRepository,
      useClass: MySqlDivisionRepository,
    },
  ],
  exports: [DivisionService],
})
export class DivisionModule {}
