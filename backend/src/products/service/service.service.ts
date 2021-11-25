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
      
         
        return this.ProductssRepo.find({ relations:["unit_purchase", "unit_sale"] });
      }
    
      findOne(id: number) {
        return this.ProductssRepo.findOne(id);
      }
    
      create(body: any) {
        const newProducts = new Products();
        
        newProducts.name = body.name
        newProducts.description = body.description
        newProducts.sku = body.sku
        newProducts.code_bar = body.code_bar
        newProducts.current_existence = body.current_existence
        newProducts.reserved_quantity = body.reserved_quantity
        newProducts.purchase_unit_id = body.purchase_unit_id
        newProducts.sale_unit_id = body.sale_unit_id
        newProducts.product_parent_id = body.product_parent_id
        newProducts.isdererivado = body.product_parent_id ? true : false
        newProducts.user_id = body.user_id

        return this.ProductssRepo.save(newProducts);
      }
    
      async update(id: number, body: any) {
        const Products = await this.ProductssRepo.findOne(id);
        this.ProductssRepo.update(id, {
          name : body.name,
          description : body.description,
          sku : body.sku,
          code_bar : body.code_bar,
          purchase_unit_id : body.purchase_unit_id,
          sale_unit_id : body.sale_unit_id,
          user_id : body.user_id
  
        });
        return this.ProductssRepo.save(Products);
      }
    
      async remove(id: number) {
        await this.ProductssRepo.delete(id);
        return true;
      }
}
