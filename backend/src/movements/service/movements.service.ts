import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Header } from '../../header/entities/header.entity';

import { getManager } from "typeorm";
import { Movements } from 'src/movements/entities/movements.entity';

@Injectable()
export class MovementsService {
    constructor(
        @InjectRepository(Movements) private MovementsRepo: Repository<Movements>,
        @InjectRepository(Header) private HeaderRepo: Repository<Header>,
    ) { }

    async findAll() {
        return await this.MovementsRepo.find({ relations: ["kindMovements", "Products", "Header", "Header.Person"] });
    }

    async findNumberOrder(number: number) {
        //return await this.MovementsRepo.find({ relations: ["kindMovements", "Products", "Header", "Header.Person"], where: { header_id: number } });
        const res = await this.HeaderRepo.find({ relations : ["Person", "Movements", "Movements.kindMovements", "Movements.Products"], where : { number_order : number }  })
        return res[0].Movements
    }

    async create(body: any) {

       //const check_header = await this.HeaderRepo.find({ where : { number_order : body.number_order } })
       
      
        getManager().transaction(async manager => {

            const check_header = await manager.find(Header, { where : {number_order : body.number_order} })

            
             if(check_header.length > 0)
            {
                await manager.insert(Movements,{
                    kindMovements_id : body.kindMovements_id,
                    product_id : body.product_id,
                    quantity : body.quantity,
                    totalPurchasePrice : body.totalPurchasePrice,
                    unitPrice : body.unitPrice,
                    header_id : check_header[0].id
                })
            }else{
                const header_id = await manager.insert(Header,{
                    person_id : body.personOrProvider_id,
                    number_order : body.number_order
                })
    
                await manager.insert(Movements,{
                    kindMovements_id : body.kindMovements_id,
                    product_id : body.product_id,
                    quantity : body.quantity,
                    totalPurchasePrice : body.totalPurchasePrice,
                    unitPrice : body.unitPrice,
                    header_id : header_id.raw[0].id
                })
    
            }

          
        });

        return  this.HeaderRepo.find({ where : {number_order : body.number_order} })

    }

    async remove(id: number) {
        await this.MovementsRepo.delete(id);
        return true;
    }
}
