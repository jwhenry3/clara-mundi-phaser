import { Test, TestingModule } from '@nestjs/testing';
import { MasterServerController } from './master-server.controller';
import { MasterServerService } from './master-server.service';

describe('MasterServerController', () => {
  let masterServerController: MasterServerController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [MasterServerController],
      providers: [MasterServerService],
    }).compile();

    masterServerController = app.get<MasterServerController>(MasterServerController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(masterServerController.getHello()).toBe('Hello World!');
    });
  });
});
