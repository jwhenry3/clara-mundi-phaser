import { Controller, Get } from '@nestjs/common'

import { PartyServerService } from './party-server.service'

@Controller('party-server')
export class PartyServerController {
  constructor(private readonly partyServerService: PartyServerService) {}

  @Get()
  getHello(): string {
    return this.partyServerService.getHello()
  }
}
