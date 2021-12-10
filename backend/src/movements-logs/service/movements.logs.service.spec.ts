import { Test, TestingModule } from '@nestjs/testing';
import { MovementsLogsService } from './movements.logs.service';

describe('MovementsLogsService', () => {
  let service: MovementsLogsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MovementsLogsService],
    }).compile();

    service = module.get<MovementsLogsService>(MovementsLogsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
