import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';

import { UsersService } from "../services/users.service";

@Controller('api/users')
export class UsersController {
    constructor(
        private UsersService: UsersService
    ) { }

    
    @Get()
    async findAll() {
        return await this.UsersService.findAll()
    }


    @Post("login")
     async login(@Body() body: any) {
         //console.log(body)
        return await this.UsersService.login(body)
    }

    @Post("register")
    async register(@Body() body: any) {
        try {
            await this.UsersService.register(body)
            return { success : true, data : null, error: null };
        } catch (error) {
            return { success : false, data : null, error: error };
        }
        
    }

    @Put(':id')
    async update(@Param('id') id: number, @Body() body: any) {
        return await this.UsersService.update(id, body)
    }

    @Delete(':id')
    async remove(@Param('id') id: number) {
        return await this.UsersService.remove(id)
    }
}
