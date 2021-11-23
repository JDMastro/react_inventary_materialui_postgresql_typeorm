import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Units } from "../../entities/units.entity";


@Injectable()
export class UnitsService {
  constructor(
    @InjectRepository(Units) private UnitsRepo: Repository<Units>,
  ) { }


  findAll() {
    return this.UnitsRepo.find();
  }

  findOne(id: number) {
    return this.UnitsRepo.findOne(id);
  }

  create(body: any) {
    const newUnits = new Units();
    newUnits.description = body.description
    newUnits.name = body.name
    return this.UnitsRepo.save(newUnits);
  }

  async update(id: number, body: any) {
    const Products = await this.UnitsRepo.findOne(id);
    this.UnitsRepo.update(id, {
      name: body.name,
      description: body.description
    });
    return this.UnitsRepo.save(Products);
  }

  async remove(id: number) {
    await this.UnitsRepo.delete(id);
    return true;
  }


}
