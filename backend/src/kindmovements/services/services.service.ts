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
        newKindMove.iduser = body.iduser
        newKindMove.provider = body.provider
        newKindMove.entry = body.entry

        return this.KindMovementsRepo.save(newKindMove);
    }

    async update(id: number, body: any) {
        const Products = await this.KindMovementsRepo.findOne(id);
        this.KindMovementsRepo.update(id, {
            name : body.name,
            description : body.description,
            iduser : body.iduser,
            provider : body.provider,
            entry : body.entry
        });
        return this.KindMovementsRepo.save(Products);
    }

    async remove(id: number) {
        await this.KindMovementsRepo.delete(id);
        return true;
    }
}
