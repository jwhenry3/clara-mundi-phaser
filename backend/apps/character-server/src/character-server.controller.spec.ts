import { Test, TestingModule } from '@nestjs/testing';
import { CharacterServerController } from './character-server.controller';
import { CharacterServerService } from './character-server.service';

describe('CharacterServerController', () => {
  let characterServerController: CharacterServerController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [CharacterServerController],
      providers: [CharacterServerService],
    }).compile();

    characterServerController = app.get<CharacterServerController>(CharacterServerController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(characterServerController.getHello()).toBe('Hello World!');
    });
  });
});
