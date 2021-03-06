import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Person } from '../entities/person.entity'

@Injectable()
export class PersonServicesService {
    constructor(
        @InjectRepository(Person) private PersonRepo: Repository<Person>,
      ) {}

      async findAll() {   
        return this.PersonRepo.find({ relations:["Kindidentity", "Headers"] });
      }

      async findByKindMovement(mov : boolean) {   
        return this.PersonRepo.find({ where :{ provider : mov  }, relations:["Kindidentity", "Headers"] });
      }

      findOne(id: number) {
        return this.PersonRepo.findOne(id);
      }
    
      create(body: any) {
        
        const newPerson = new Person();
       
        newPerson.kind_id = body.kind_id
        newPerson.idnumber = body.idnumber
        newPerson.name = body.name
        newPerson.second_name = body.second_name
        newPerson.first_surname = body.first_surname
        newPerson.second_surname = body.second_surname
        newPerson.fullname = `${body.name} ${body.second_name} ${body.first_surname} ${body.second_surname}`
        newPerson.address = body.address
        newPerson.phone = body.phone
        newPerson.contact = body.contact
        newPerson.user_id = body.iduser
        newPerson.provider = body.provider

        return this.PersonRepo.save(newPerson);
      }
    
      async update(id: number, body: any) {
        const Products = await this.PersonRepo.findOne(id);
        this.PersonRepo.update(id, {
            kind_id : body.kind_id,
            idnumber : body.idnumber,
            name : body.name,
            second_name : body.second_name,
            first_surname : body.first_surname,
            second_surname : body.second_surname,
            fullname : `${body.name} ${body.second_name} ${body.first_surname} ${body.second_surname}`,
            address : body.address,
            phone : body.phone,
            contact : body.contact,
            user_id : body.iduser,
            provider : body.provider
        });
        return this.PersonRepo.save(Products);
      }
    
      async remove(id: number) {
        await this.PersonRepo.delete(id);
        return true;
      }
}
