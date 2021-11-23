import { Test, TestingModule } from '@nestjs/testing';
import { ProductcontrollerController } from './productcontroller.controller';

describe('ProductcontrollerController', () => {
  let controller: ProductcontrollerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductcontrollerController],
    }).compile();

    controller = module.get<ProductcontrollerController>(ProductcontrollerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
