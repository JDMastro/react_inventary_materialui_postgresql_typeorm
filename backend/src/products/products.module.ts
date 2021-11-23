import { Module } from '@nestjs/common';
import { ServiceService } from './service/service.service';
import { ProductcontrollerController } from './controller/productcontroller.controller';
import { TypeOrmModule } from "@nestjs/typeorm";
import { Products } from './entities/product.entity';

@Module({
  imports : [TypeOrmModule.forFeature([Products])],
  providers: [ServiceService],
  controllers: [ProductcontrollerController]
})
export class ProductsModule {}
