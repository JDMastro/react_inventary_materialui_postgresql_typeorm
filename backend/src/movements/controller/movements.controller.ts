import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';

import { MovementsService } from '../service/movements.service';

@Controller('api/movements')
export class MovementsController {
    constructor(
        private ServiceService: MovementsService
    ) { }

    @Get()
    findAll() {
        return this.ServiceService.findAll();
    }

    @Get(':number')
    async findNumberOrder(@Param('number') number: number) {
        return this.ServiceService.findNumberOrder(number)
    }

    @Get('usersorders/:number')
    async findUsersOrders(@Param('number') number: number) {
        return this.ServiceService.findUsersOrders(number)
    }

    @Get('productbyorderid/:number')
    async findfindProductByOrderId(@Param('number') number: number) {
        return this.ServiceService.findProductByOrderId(number)
    }

    
    @Post()
    async create(@Body() body: any) {
        try {
            const res = await this.ServiceService.create(body)
            return { success: true, data: res, error: null }
        } catch (error) {
            return { success: false, data: null, error }
        }
        /*this.ServiceService.create(body)
        .then(e =>{ return { Successfully : true, data : e, error : null } })
        .catch(e =>{ return { Successfully : false, data : null, error : e } });*/
    }

    @Delete(':id')
    async delete(@Param('id') id: number) {
        try {
            await this.ServiceService.remove(id)
            return { success: true, data: null, error: null }
        } catch (err) {
            return { success: true, data: null, error: err };
        }
    }
}
