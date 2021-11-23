import { Test, TestingModule } from '@nestjs/testing';
import { PersonControllerController } from './person-controller.controller';

describe('PersonControllerController', () => {
  let controller: PersonControllerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PersonControllerController],
    }).compile();

    controller = module.get<PersonControllerController>(PersonControllerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
