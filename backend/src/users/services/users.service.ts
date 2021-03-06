import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from "../entities/users.entity";
import { compare_password, encrypt } from "../../helper/encrypt";


@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(Users) private UsersRepo: Repository<Users>,
    ) { }

    findAll() {
        return this.UsersRepo.find({ select: ['id', 'code', 'email'] });
    }


    async login(body: any) {
        const { email, password } = body
        const user = await this.UsersRepo.findOne({ where: { email } })

        if(!user)
            return { success: false, data: null, error: "Credenciales invalidas" }


        if(! await compare_password(password, user.password))
            return { success: false, data: null, error: "Credenciales invalidas" }



        return { success: true, data: null, error: null }
    }

    async register(body: any) {
        const { code, email, password } = body

        const newUsers = new Users();

        newUsers.code = code
        newUsers.email = email
        newUsers.password = await encrypt(password)


        return await delete (await this.UsersRepo.save(newUsers)).password


    }

    async update(id: number, body: any) {
        const { code, email, password } = body
        const Products = await this.UsersRepo.findOne(id);
        this.UsersRepo.update(id, {
            code: code,
            email: email,
            password: await encrypt(password)
        });
        return await this.UsersRepo.save(Products);
    }

    async remove(id: number) {
        await this.UsersRepo.delete(id);
        return true;
    }

}
