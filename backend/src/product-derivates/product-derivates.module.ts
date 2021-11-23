import { Module } from '@nestjs/common';
import { ProductDerivatesService } from './services/product-derivates/product-derivates.service';
import { ProductDerivatesController } from './controllers/product-derivates/product-derivates.controller';
import { ProductsDerivates } from "./entities/product-derivates.entity";
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports : [TypeOrmModule.forFeature([ProductsDerivates])],
  providers: [ProductDerivatesService],
  controllers: [ProductDerivatesController]
})
export class ProductDerivatesModule {}
