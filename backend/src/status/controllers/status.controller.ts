import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';

import { StatusService } from '../services/status.service';


@Controller('api/status')
export class StatusController {
    constructor(
        private ServiceService: StatusService
      ) { }
    
      @Get()
      findAll() {
        return this.ServiceService.findAll();
      }
    
      @Get(':id')
      findOne(@Param('id') id: number) {
        return this.ServiceService.findOne(id);
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
    
      @Put(':id')
      async update(@Param('id') id: number, @Body() body: any) {
        try {
          await this.ServiceService.update(id, body);
          return { success: true, data: null, error: null }
        } catch (err) {
          return { success: true, data: null, error: err };
        }
    
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

      @Get('getAllNumberOrdersbyStatus/:status_id/:person_id')
      async getAllNumberOrdersbyStatus(@Param('status_id') status_id : number,@Param('person_id')  person_id : number)
      {
        return await this.ServiceService.getAllNumberOrdersbyStatus(status_id, person_id)
      }

      @Get('getAllnumberOrders/:number_orders')
      async getAllnumberOrders(@Param('number_orders') number_orders : number)
      {
        return await this.ServiceService.getAllnumberOrders(number_orders)
      }
}
