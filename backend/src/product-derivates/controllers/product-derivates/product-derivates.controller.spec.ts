import { Test, TestingModule } from '@nestjs/testing';
import { ProductDerivatesController } from './product-derivates.controller';

describe('ProductDerivatesController', () => {
  let controller: ProductDerivatesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductDerivatesController],
    }).compile();

    controller = module.get<ProductDerivatesController>(ProductDerivatesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
