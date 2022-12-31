import { Test, TestingModule } from '@nestjs/testing';
import { QuestServerController } from './quest-server.controller';
import { QuestServerService } from './quest-server.service';

describe('QuestServerController', () => {
  let questServerController: QuestServerController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [QuestServerController],
      providers: [QuestServerService],
    }).compile();

    questServerController = app.get<QuestServerController>(QuestServerController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(questServerController.getHello()).toBe('Hello World!');
    });
  });
});
