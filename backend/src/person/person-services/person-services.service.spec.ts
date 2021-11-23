import { Test, TestingModule } from '@nestjs/testing';
import { PersonServicesService } from './person-services.service';

describe('PersonServicesService', () => {
  let service: PersonServicesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PersonServicesService],
    }).compile();

    service = module.get<PersonServicesService>(PersonServicesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
