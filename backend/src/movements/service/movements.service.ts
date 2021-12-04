import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Header } from '../../header/entities/header.entity';

import { Movements } from 'src/movements/entities/movements.entity';
import { KindMovements } from '../../kindmovements/entities/kindmovements.entity';
import { Products } from "../../products/entities/product.entity";


import { getManager } from "typeorm";


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
        const res = await this.HeaderRepo.find({ relations: ["Person", "Movements", "Movements.kindMovements", "Movements.Products"], where: { number_order: number } })
        return res[0].Movements
    }

    async create(body: any) {

        const check_header = await this.HeaderRepo.find({ where: { number_order: body.number_order } })
        //const check_kindmov = await KindMovements.find({ where :{ id : body.kindMovements_id } })
        const check_kindmov = await getManager().find(KindMovements, { where: { id: body.kindMovements_id } })
        const check_products = await getManager().find(Products, { where: { id: body.product_id } })

        //const check_header = await manager.find(Header, { where : {number_order : body.number_order} })
        //const check_kindmov = await manager.find(KindMovements,{ where :{ id : body.kindMovements_id } })

/*

        if (check_kindmov[0].entry && check_kindmov[0].provider) {
            if (check_header.length > 0) {
                await getManager().insert(Movements, {
                    kindMovements_id: body.kindMovements_id,
                    product_id: body.product_id,
                    quantity: body.quantity,
                    totalPurchasePrice: body.totalPurchasePrice,
                    unitPrice: body.unitPrice,
                    header_id: check_header[0].id
                })

                await getManager().update(Products,body.product_id,{
                    current_existence : check_products[0].current_existence + body.quantity
                })
            } else {
                const header_id = await getManager().insert(Header, {
                    person_id: body.personOrProvider_id,
                    number_order: body.number_order
                })

                await getManager().insert(Movements, {
                    kindMovements_id: body.kindMovements_id,
                    product_id: body.product_id,
                    quantity: body.quantity,
                    totalPurchasePrice: body.totalPurchasePrice,
                    unitPrice: body.unitPrice,
                    header_id: header_id.raw[0].id
                })

                await getManager().update(Products,body.product_id,{
                    current_existence : check_products[0].current_existence + body.quantity
                })

            }
        }


        if(!check_kindmov[0].entry && check_kindmov[0].provider)
        {
             if(check_products[0].current_existence < body.quantity)
            {
                return {  success : false, data : null, error : {  quantity : "La cantidad no puede ser mayor cantidad existente"  } }
            }else{
                if (check_header.length > 0) {
                    await getManager().insert(Movements, {
                        kindMovements_id: body.kindMovements_id,
                        product_id: body.product_id,
                        quantity: body.quantity,
                        totalPurchasePrice: body.totalPurchasePrice,
                        unitPrice: body.unitPrice,
                        header_id: check_header[0].id
                    })
    
                    await getManager().update(Products,body.product_id,{
                        current_existence : check_products[0].current_existence - body.quantity
                    })
                } else {
                    const header_id = await getManager().insert(Header, {
                        person_id: body.personOrProvider_id,
                        number_order: body.number_order
                    })
    
                    await getManager().insert(Movements, {
                        kindMovements_id: body.kindMovements_id,
                        product_id: body.product_id,
                        quantity: body.quantity,
                        totalPurchasePrice: body.totalPurchasePrice,
                        unitPrice: body.unitPrice,
                        header_id: header_id.raw[0].id
                    })
    
                    await getManager().update(Products,body.product_id,{
                        current_existence : check_products[0].current_existence - body.quantity
                    })
    
                }
            }
        }

       
*/



        return  this.HeaderRepo.find({ where : {number_order : body.number_order} })

    }

    async remove(id: number) {
        await this.MovementsRepo.delete(id);
        return true;
    }
}
