import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Movements } from "../entities/movements.entity"

@Injectable()
export class MovementsService {
    constructor(
        @InjectRepository(Movements) private MovementsRepo: Repository<Movements>,
    ) { }

    async findAll() {
        return this.MovementsRepo.find({ relations: ["kindMovements", "Person", "Products"] });
    }

    async findNumberOrder(number: number) {
        return this.MovementsRepo.find({ relations: ["kindMovements", "Person", "Products"], where: { number_order: number } });
    }

    create(body: any) {
        const newMovements = new Movements();
        newMovements.kindMovements_id = body.kindMovements_id
        newMovements.personOrProvider_id = body.personOrProvider_id
        newMovements.number_order = body.number_order
        newMovements.product_id = body.product_id
        newMovements.quantity = body.quantity
        newMovements.totalPurchasePrice = body.totalPurchasePrice
        newMovements.unitPrice = body.unitPrice

        return this.MovementsRepo.save(newMovements);
    }

    async remove(id: number) {
        await this.MovementsRepo.delete(id);
        return true;
    }
}
