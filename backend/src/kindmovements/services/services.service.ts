import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { KindMovements } from "../entities/kindmovements.entity";

@Injectable()
export class ServicesService {
    constructor(
        @InjectRepository(KindMovements) private KindMovementsRepo: Repository<KindMovements>,
    ) { }

    async findAll() {
        return this.KindMovementsRepo.find();
    }
    findOne(id: number) {
        return this.KindMovementsRepo.findOne(id);
    }

    create(body: any) {
        const newKindMove = new KindMovements();
        newKindMove.name = body.name
        newKindMove.description = body.description
        newKindMove.user_id = body.iduser
        newKindMove.provider = body.provider
        newKindMove.input = body.input

        newKindMove.output = body.output
        newKindMove.return = body.return

        return this.KindMovementsRepo.save(newKindMove);
    }

    async update(id: number, body: any) {
        const Products = await this.KindMovementsRepo.findOne(id);
        this.KindMovementsRepo.update(id, {
            name : body.name,
            description : body.description,
            user_id : body.iduser,
            provider : body.provider,
            input : body.input,

            output : body.output,
            return : body.return
        });
        return this.KindMovementsRepo.save(Products);
    }

    async remove(id: number) {
        await this.KindMovementsRepo.delete(id);
        return true;
    }
}
