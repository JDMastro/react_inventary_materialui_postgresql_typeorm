import { Module } from '@nestjs/common';
import { MovementsService } from './service/movements.service';
import { MovementsController } from './controller/movements.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Movements } from './entities/movements.entity';
import { Header } from "../header/entities/header.entity";

@Module({
  imports : [TypeOrmModule.forFeature([Movements, Header])],
  providers: [MovementsService],
  controllers: [MovementsController]
})
export class MovementsModule {}
