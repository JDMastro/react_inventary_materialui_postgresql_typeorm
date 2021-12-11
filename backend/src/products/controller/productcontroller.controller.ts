import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';

import { ServiceService } from './../service/service.service';
@Controller('api/productcontroller')
export class ProductcontrollerController {
  constructor(
    private ServiceService: ServiceService
  ) { }

  @Get()
  findAll() {
    return this.ServiceService.findAll();
  }

  @Get(':status')
  findByKindMovement(@Param('status') status: boolean) {

    return this.ServiceService.findByKindMovement(status)
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

  @Get('getproduct/:isderivate')
  getProductDerivatesAndNot(@Param('isderivate') isderivate: boolean) {
    return this.ServiceService.getProductDerivatesAndNot(isderivate);
  }

  @Get('getproductchild/:child')
  getProductChild(@Param('child') child: number) {
    return this.ServiceService.getProductChild(child);
  }



}
