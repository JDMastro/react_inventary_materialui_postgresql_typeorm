import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';

import { ProductDerivatesService } from '../../services/product-derivates/product-derivates.service';


@Controller('api/product-derivates')
export class ProductDerivatesController {
    constructor(
        private ServiceService: ProductDerivatesService
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
}
