import { Module } from '@nestjs/common';
import { ServicesService } from './services/services.service';
import { KindidentityControllerController } from './kindidentity-controller/kindidentity-controller.controller';
import { Kindidentity } from "./entities/kindidentity.entity";
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports : [TypeOrmModule.forFeature([Kindidentity])],
  providers: [ServicesService],
  controllers: [KindidentityControllerController]
})
export class KindidentityModule {}
