import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Products } from './../entities/product.entity'

@Injectable()
export class ServiceService {
    constructor(
        @InjectRepository(Products) private ProductssRepo: Repository<Products>,
      ) {}
    
      async findAll() {
      
         
        return this.ProductssRepo.find({ relations:["unit"] });
      }
    
      findOne(id: number) {
        return this.ProductssRepo.findOne(id);
      }
    
      create(body: any) {
        const newProducts = new Products();
        newProducts.sku = body.sku
        newProducts.code = body.code
        newProducts.code_bar = body.code_bar
        newProducts.name = body.name
        newProducts.description = body.description
        newProducts.existence = body.existence
        newProducts.reservedquantity = body.reservedquantity
        newProducts.unit_id = body.unit
        newProducts.iduser = body.iduser
        return this.ProductssRepo.save(newProducts);
      }
    
      async update(id: number, body: any) {
        const Products = await this.ProductssRepo.findOne(id);
        this.ProductssRepo.update(id, {
          sku : body.sku,
          code : body.code,
          code_bar : body.code_bar,
          name : body.name,
          description : body.description,
          existence : body.existence,
          reservedquantity : body.reservedquantity,
          unit_id : body.unit,
          iduser : body.iduser
        });
        return this.ProductssRepo.save(Products);
      }
    
      async remove(id: number) {
        await this.ProductssRepo.delete(id);
        return true;
      }
}
