import { Module } from '@nestjs/common';
import { MovementsLogsService } from './service/movements.logs.service';
import { MovementsLogsController } from './controller/movements.logs.controller';

@Module({
  providers: [MovementsLogsService],
  controllers: [MovementsLogsController]
})
export class MovementsLogsModule {}
