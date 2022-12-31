import { Test, TestingModule } from '@nestjs/testing';
import { ChatServerController } from './chat-server.controller';
import { ChatServerService } from './chat-server.service';

describe('ChatServerController', () => {
  let chatServerController: ChatServerController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ChatServerController],
      providers: [ChatServerService],
    }).compile();

    chatServerController = app.get<ChatServerController>(ChatServerController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(chatServerController.getHello()).toBe('Hello World!');
    });
  });
});
