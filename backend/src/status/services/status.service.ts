import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Status  } from '../entities/status.entity'


@Injectable()
export class StatusService {
    constructor(
        @InjectRepository(Status) private StatusRepo: Repository<Status>,
      ) {}

      async findAll() {   
        return this.StatusRepo.find();
      }
      findOne(id: number) {
        return this.StatusRepo.findOne(id);
      }
    
      create(body: any) {
        const newStatus = new Status();
      
        newStatus.name = body.name
        newStatus.description = body.description
       
        return this.StatusRepo.save(newStatus);
      }
    
      async update(id: number, body: any) {
        const Products = await this.StatusRepo.findOne(id);
        this.StatusRepo.update(id, {
            name : body.name,
            description : body.description
        });
        return this.StatusRepo.save(Products);
      }
    
      async remove(id: number) {
        await this.StatusRepo.delete(id);
        return true;
      }
}
