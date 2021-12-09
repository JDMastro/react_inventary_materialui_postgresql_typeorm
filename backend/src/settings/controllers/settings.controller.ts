import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';

import { SettingsService } from "../services/settings.service";

@Controller('api/settings')
export class SettingsController {
    constructor(
        private SettingsService: SettingsService
      ) {}
    
      @Get()
      findAll() {
        return this.SettingsService.findAll();
      }
}
