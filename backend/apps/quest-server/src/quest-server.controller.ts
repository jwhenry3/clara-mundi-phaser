import { Controller, Get } from '@nestjs/common'

import { QuestServerService } from './quest-server.service'

@Controller('quest-server')
export class QuestServerController {
  constructor(private readonly questServerService: QuestServerService) {}

  @Get()
  getHello(): string {
    return this.questServerService.getHello()
  }
}
