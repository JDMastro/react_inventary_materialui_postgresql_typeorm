import { Test, TestingModule } from '@nestjs/testing';
import { MovementsLogsController } from './movements.logs.controller';

describe('MovementsLogsController', () => {
  let controller: MovementsLogsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MovementsLogsController],
    }).compile();

    controller = module.get<MovementsLogsController>(MovementsLogsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
