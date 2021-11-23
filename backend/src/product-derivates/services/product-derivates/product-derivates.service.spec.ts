import { Test, TestingModule } from '@nestjs/testing';
import { ProductDerivatesService } from './product-derivates.service';

describe('ProductDerivatesService', () => {
  let service: ProductDerivatesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductDerivatesService],
    }).compile();

    service = module.get<ProductDerivatesService>(ProductDerivatesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
