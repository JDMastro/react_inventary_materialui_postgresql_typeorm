import { Test, TestingModule } from '@nestjs/testing';
import { UnitscontrollerController } from './unitscontroller.controller';

describe('UnitscontrollerController', () => {
  let controller: UnitscontrollerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UnitscontrollerController],
    }).compile();

    controller = module.get<UnitscontrollerController>(UnitscontrollerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
