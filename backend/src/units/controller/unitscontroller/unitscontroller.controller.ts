import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';

import { UnitsService } from "../../services/units/units.service";


@Controller('api/unitscontroller')
export class UnitscontrollerController {
    constructor(
        private UnitsService: UnitsService
      ) {}
    
      @Get()
      findAll() {
        return this.UnitsService.findAll();
      }
      @Get(':id')
      findOne(@Param('id') id: number) {
        return this.UnitsService.findOne(id);
      }
    
      @Post()
      async create(@Body() body: any) {
        try {
          const res = await this.UnitsService.create(body)
          return { success: true, data: res, error: null }
        } catch (error) {
          return { success: false, data: null, error }
        }
        /*this.UnitsService.create(body)
        .then(e =>{ return { Successfully : true, data : e, error : null } })
        .catch(e =>{ return { Successfully : false, data : null, error : e } });*/
      }
    
      @Put(':id')
      async update(@Param('id') id: number, @Body() body: any) {
        try {
          await this.UnitsService.update(id, body);
          return { success: true, data: null, error: null }
        } catch (err) {
          return { success: true, data: null, error: err };
        }
    
      }
    
      @Delete(':id')
      async delete(@Param('id') id: number) {
        try {
          await this.UnitsService.remove(id)
          return { success: true, data: null, error: null }
        } catch (err) {
          return { success: true, data: null, error: err };
        }
      }
}
