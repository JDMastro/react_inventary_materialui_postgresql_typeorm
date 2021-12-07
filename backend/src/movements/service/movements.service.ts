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

    async findProductByOrderId(number : number)
    {
        const res = await this.HeaderRepo.find({ relations: ["Movements","Movements.Products", "Movements.Products.unit_purchase", "Movements.Products.unit_sale"], where: { id: number } })
        const products : any[] = []
        let movement : any[] = []

        if(res.length > 0){
            res[0].Movements.map((e)=> products.push(e.Products)  )
            movement = res[0].Movements
        }


        return {products, movement}
    }

    async findUsersOrders(person_id : number)
    {
        const res = await this.HeaderRepo.find({ relations:["Movements"],  where : { person_id : person_id }})

        return res.filter(e => e.Movements.filter(s => s.quantity < s.quantity_returned ) )
        //return this.HeaderRepo.find({ relations:["Movements"],  where : { person_id : person_id }})
    }

    async create(body: any) {

        const check_header = await this.HeaderRepo.find({ where: { number_order: body.number_order } })
         //const check_kindmov = await KindMovements.find({ where :{ id : body.kindMovements_id } })
        const check_kindmov = await getManager().find(KindMovements, { where: { id: body.kindMovements_id } })
        const check_products = await getManager().find(Products, { where: { id: body.product_id } })
        
        //const check_header = await manager.find(Header, { where : {number_order : body.number_order} })
        //const check_kindmov = await manager.find(KindMovements,{ where :{ id : body.kindMovements_id } })


        if (check_kindmov[0].input && check_kindmov[0].provider) {
            if (check_header.length > 0) {
                await getManager().insert(Movements, {
                    kindMovements_id: body.kindMovements_id,
                    product_id: body.product_id,
                    quantity: body.quantity,
                    totalPurchasePrice: body.totalPurchasePrice,
                    unitPrice: body.unitPrice,
                    header_id: check_header[0].id,
                    quantity_returned : 0,
                    status_id : body.status_id
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
                    header_id: header_id.raw[0].id,
                    quantity_returned : 0,
                    status_id : body.status_id
                })

                await getManager().update(Products,body.product_id,{
                    current_existence : check_products[0].current_existence + body.quantity
                })

            }
        }


        if(!check_kindmov[0].input && check_kindmov[0].provider)
        {
            const check_quantity_mov = await getManager().find(Movements,{ where : { header_id : body.orderReturned } })

             if(check_quantity_mov[0].quantity < body.quantity)
            {
                return {  success : false, data : null, error : {  quantity : "La cantidad no puede ser mayor cantidad comprada en la orden"  } }
            }else{
                if(check_products[0].current_existence < body.quantity){
                    return {  success : false, data : null, error : {  quantity : "La cantidad no puede ser mayor cantidad existente"  } }
                }else{
                    if (check_header.length > 0) {
                        await getManager().insert(Movements, {
                            kindMovements_id: body.kindMovements_id,
                            product_id: body.product_id,
                            quantity: body.quantity,
                            totalPurchasePrice: body.totalPurchasePrice,
                            unitPrice: body.unitPrice,
                            header_id: check_header[0].id,
                            quantity_returned : 0,
                            status_id : body.status_id
                        })

                        
                        
        
                        await getManager().update(Products,body.product_id,{
                            current_existence : check_products[0].current_existence - body.quantity
                        })
                    } else {
                        const header_id = await getManager().insert(Header, {
                            person_id: body.personOrProvider_id,
                            number_order: body.number_order
                        })

                        console.log("<--------",body.movement_id)
        
                        await getManager().insert(Movements, {
                            kindMovements_id: body.kindMovements_id,
                            product_id: body.product_id,
                            quantity: body.quantity,
                            totalPurchasePrice: body.totalPurchasePrice,
                            unitPrice: body.unitPrice,
                            header_id: header_id.raw[0].id, 
                            quantity_returned : 0,
                            status_id : body.status_id
                        })

                        await getManager().update(Movements,body.movement_id,{
                            quantity_returned : body.quantity
                        })
        
                        await getManager().update(Products,body.product_id,{
                            current_existence : check_products[0].current_existence - body.quantity
                        })
        
                    }
                }
                /*if (check_header.length > 0) {
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
    
                }*/
            }
        }







        if (!check_kindmov[0].input && !check_kindmov[0].provider) {
            console.log("no")
            if (check_header.length > 0) {
                await getManager().insert(Movements, {
                    kindMovements_id: body.kindMovements_id,
                    product_id: body.product_id,
                    quantity: body.quantity,
                    totalPurchasePrice: body.totalPurchasePrice,
                    unitPrice: body.unitPrice,
                    header_id: check_header[0].id,
                    quantity_returned : 0,
                    status_id : body.status_id
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
                    header_id: header_id.raw[0].id,
                    quantity_returned : 0,
                    status_id : body.status_id
                })

                await getManager().update(Products,body.product_id,{
                    current_existence : check_products[0].current_existence + body.quantity
                })

            }
        }




//Cliente - salida
        if(check_kindmov[0].input && !check_kindmov[0].provider)
        {
            const check_quantity_mov = await getManager().find(Movements,{ where : { header_id : body.orderReturned } })

             if(check_quantity_mov[0].quantity < body.quantity)
            {
                return {  success : false, data : null, error : {  quantity : "La cantidad no puede ser mayor cantidad comprada en la orden"  } }
            }else{
                if(check_products[0].current_existence < body.quantity){
                    return {  success : false, data : null, error : {  quantity : "La cantidad no puede ser mayor cantidad existente"  } }
                }else{
                    if (check_header.length > 0) {
                        await getManager().insert(Movements, {
                            kindMovements_id: body.kindMovements_id,
                            product_id: body.product_id,
                            quantity: body.quantity,
                            totalPurchasePrice: body.totalPurchasePrice,
                            unitPrice: body.unitPrice,
                            header_id: check_header[0].id,
                            status_id : body.status_id
                        })
        
                        await getManager().update(Products,body.product_id,{
                            reserved_quantity : check_products[0].reserved_quantity + body.quantity
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
                            header_id: header_id.raw[0].id,
                            status_id : body.status_id
                        })

                        await getManager().update(Movements,body.movement_id,{
                            quantity_returned : body.quantity
                        })
        
                        await getManager().update(Products,body.product_id,{
                            reserved_quantity : check_products[0].reserved_quantity + body.quantity
                        })
        
                    }
                }
                /*if (check_header.length > 0) {
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
    
                }*/
            }
        }




        return  this.HeaderRepo.find({ where : {number_order : body.number_order} })

    }

    async remove(id: number) {
        await this.MovementsRepo.delete(id);
        return true;
    }
}
