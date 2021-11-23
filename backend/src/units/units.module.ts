import { Module } from '@nestjs/common';
import { UnitsService } from './services/units/units.service';
import { UnitscontrollerController } from './controller/unitscontroller/unitscontroller.controller';
import { TypeOrmModule } from "@nestjs/typeorm";
import { Units } from './entities/units.entity';

@Module({
  imports : [TypeOrmModule.forFeature([Units])],
  providers: [UnitsService],
  controllers: [UnitscontrollerController]
})
export class UnitsModule {}
