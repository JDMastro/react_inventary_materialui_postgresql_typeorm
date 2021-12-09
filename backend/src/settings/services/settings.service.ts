import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Settings } from '../entities/settings.entity';


@Injectable()
export class SettingsService {
    constructor(
        @InjectRepository(Settings) private SettingsRepo: Repository<Settings>,
      ) { }
    
    
      findAll() {
        return this.SettingsRepo.find();
      }
}
