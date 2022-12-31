import { Test, TestingModule } from '@nestjs/testing';
import { PartyServerController } from './party-server.controller';
import { PartyServerService } from './party-server.service';

describe('PartyServerController', () => {
  let partyServerController: PartyServerController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [PartyServerController],
      providers: [PartyServerService],
    }).compile();

    partyServerController = app.get<PartyServerController>(PartyServerController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(partyServerController.getHello()).toBe('Hello World!');
    });
  });
});
