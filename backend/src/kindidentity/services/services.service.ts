import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Kindidentity  } from '../entities/kindidentity.entity'


@Injectable()
export class ServicesService {
    constructor(
        @InjectRepository(Kindidentity) private KindidentityRepo: Repository<Kindidentity>,
      ) {}

      async findAll() {   
        return this.KindidentityRepo.find();
      }
      findOne(id: number) {
        return this.KindidentityRepo.findOne(id);
      }
    
      create(body: any) {
        const newKindId = new Kindidentity();
      
        newKindId.code_admin = body.code_admin
        newKindId.description = body.description
       
        return this.KindidentityRepo.save(newKindId);
      }
    
      async update(id: number, body: any) {
        const Products = await this.KindidentityRepo.findOne(id);
        this.KindidentityRepo.update(id, {
            code_admin : body.code_admin,
            description : body.description
        });
        return this.KindidentityRepo.save(Products);
      }
    
      async remove(id: number) {
        await this.KindidentityRepo.delete(id);
        return true;
      }
}
