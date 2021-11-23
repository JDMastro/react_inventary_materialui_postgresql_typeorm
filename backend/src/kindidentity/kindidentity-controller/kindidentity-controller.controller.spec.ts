import { Test, TestingModule } from '@nestjs/testing';
import { KindidentityControllerController } from './kindidentity-controller.controller';

describe('KindidentityControllerController', () => {
  let controller: KindidentityControllerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [KindidentityControllerController],
    }).compile();

    controller = module.get<KindidentityControllerController>(KindidentityControllerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
