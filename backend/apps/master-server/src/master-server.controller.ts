import { Controller, Get } from '@nestjs/common'
import { MessagePattern } from '@nestjs/microservices'

import { MasterServerGateway } from './master-server.gateway'
import { MasterServerService } from './master-server.service'

@Controller('master-server')
export class MasterServerController {
  constructor(private readonly masterServerService: MasterServerService) {}

  @Get()
  getHello(): string {
    return this.masterServerService.getHello()
  }

  @Get('servers')
  @MessagePattern('servers:get')
  getServers() {
    return Object.values(MasterServerGateway.instance.serverList)
  }
}
