import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getManager } from 'typeorm';
import { Status  } from '../entities/status.entity'

import { Movements } from '../../movements/entities/movements.entity';
import { Header } from '../../header/entities/header.entity';
import { Products } from '../../products/entities/product.entity';
import { Person } from "../../person/entities/person.entity";


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
        newStatus.code = body.code
       
        return this.StatusRepo.save(newStatus);
      }
    
      async update(id: number, body: any) {
        const Products = await this.StatusRepo.findOne(id);
        this.StatusRepo.update(id, {
            name : body.name,
            description : body.description,
            code : body.code
        });
        return this.StatusRepo.save(Products);
      }
    
      async remove(id: number) {
        await this.StatusRepo.delete(id);
        return true;
      }


      async getAllNumberOrdersbyStatus(status_id : number, person_id : number)
      {
        return await getManager().createQueryBuilder("movements","m")
        .select(["h.number_order","ps.fullname","sum(m.quantity) as mquantity","h.creation_at"])
            .innerJoin(Header, "h","h.id = m.header_id")
            .innerJoin(Person, "ps","ps.id = h.person_id")
            .innerJoin(Status, "sta","sta.id = m.status_id")
            .where("sta.id = :status_id",{ status_id: status_id })
            .andWhere("ps.id = :person_id",{ person_id :  person_id})
            .groupBy("h.number_order")
            .addGroupBy("ps.fullname")
            .addGroupBy("h.creation_at")
            .getRawMany()
      }

      async getAllnumberOrders(number_orders : number)
      {
        return await getManager().createQueryBuilder("movements","m")
        .select(["h.number_order", "p.name", "m.quantity", "h.creation_at"])
            .innerJoin(Header, "h","h.id = m.header_id")
            .innerJoin(Products, "p","p.id = m.product_id ")
            .where("h.number_order = :number_orders",{ number_orders: number_orders})
            .getRawMany()
      }


}
