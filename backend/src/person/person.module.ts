import { Module } from '@nestjs/common';
import { PersonServicesService } from './person-services/person-services.service';
import { PersonControllerController } from './person-controller/person-controller.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Person } from "./entities/person.entity";

@Module({
  imports : [TypeOrmModule.forFeature([Person])],
  providers: [PersonServicesService],
  controllers: [PersonControllerController]
})
export class PersonModule {}
