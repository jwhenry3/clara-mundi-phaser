import { Test, TestingModule } from '@nestjs/testing';
import { ItemServerController } from './item-server.controller';
import { ItemServerService } from './item-server.service';

describe('ItemServerController', () => {
  let itemServerController: ItemServerController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ItemServerController],
      providers: [ItemServerService],
    }).compile();

    itemServerController = app.get<ItemServerController>(ItemServerController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(itemServerController.getHello()).toBe('Hello World!');
    });
  });
});
