import { Module } from '@nestjs/common';
import { ServicesService } from './services/services.service';
import { ControllersController } from './controllers/controllers.controller';
import { KindMovements } from "./entities/kindmovements.entity";
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports : [TypeOrmModule.forFeature([KindMovements])],
  providers: [ServicesService],
  controllers: [ControllersController]

})
export class KindmovementsModule {}
