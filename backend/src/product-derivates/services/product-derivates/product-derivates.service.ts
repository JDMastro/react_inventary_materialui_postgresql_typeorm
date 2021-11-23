import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductsDerivates } from '../../entities/product-derivates.entity'

@Injectable()
export class ProductDerivatesService {
    constructor(
        @InjectRepository(ProductsDerivates) private ProductsDerivatessRepo: Repository<ProductsDerivates>,
      ) {}

      async findAll() {   
        return this.ProductsDerivatessRepo.find({ relations:["Products", "unit"] });
      }
      findOne(id: number) {
        return this.ProductsDerivatessRepo.findOne(id);
      }
    
      create(body: any) {
        const newProducts = new ProductsDerivates();
        newProducts.sku = body.sku
        newProducts.code = body.code
        newProducts.code_bar = body.code_bar
        newProducts.name = body.name
        newProducts.description = body.description
        newProducts.existence = body.existence
        newProducts.reservedquantity = body.reservedquantity
        newProducts.unit_id = body.unit
        newProducts.iduser = body.iduser
        newProducts.product_id = body.product_id,
        newProducts.quantityunit = body.quantityunit
        return this.ProductsDerivatessRepo.save(newProducts);
      }
    
      async update(id: number, body: any) {
        const Products = await this.ProductsDerivatessRepo.findOne(id);
        this.ProductsDerivatessRepo.update(id, {
          sku : body.sku,
          code : body.code,
          code_bar : body.code_bar,
          name : body.name,
          description : body.description,
          existence : body.existence,
          reservedquantity : body.reservedquantity,
          unit_id : body.unit,
          iduser : body.iduser,
          product_id : body.product_id,
          quantityunit : body.quantityunit
        });
        return this.ProductsDerivatessRepo.save(Products);
      }
    
      async remove(id: number) {
        await this.ProductsDerivatessRepo.delete(id);
        return true;
      }
}
