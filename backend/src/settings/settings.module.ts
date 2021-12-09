import { Module } from '@nestjs/common';
import { SettingsService } from './services/settings.service';
import { SettingsController } from './controllers/settings.controller';
import { Settings } from "./entities/settings.entity";
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports : [TypeOrmModule.forFeature([Settings])],
  providers: [SettingsService],
  controllers: [SettingsController]
})
export class SettingsModule {}
