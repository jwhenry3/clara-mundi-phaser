import { Controller, Get } from '@nestjs/common'
import { EventPattern, MessagePattern } from '@nestjs/microservices'

import { ProxyMessage, ProxyServerGateway } from './proxy-server.gateway'
import { ProxyServerService } from './proxy-server.service'

@Controller()
export class ProxyServerController {
  static instance: ProxyServerController
  get gateway() {
    return ProxyServerGateway.instance
  }
  constructor(private readonly proxyServerService: ProxyServerService) {
    ProxyServerController.instance = this
  }

  @EventPattern("to:character")
  onToCharacter(characterName: string, event: string, data: any) {
    if (characterName in this.gateway.clientByCharacterName) {
      this.gateway.clientByCharacterName[characterName].send(
        JSON.stringify({
          event,
          data: JSON.stringify(data),
        })
      )
    }
  }

  @EventPattern("to:all")
  onToAll(event: string, data: any) {
    for (const characterName in this.gateway.clientByCharacterName) {
      this.gateway.clientByCharacterName[characterName].send(
        JSON.stringify({
          event,
          data: JSON.stringify(data),
        })
      )
    }
  }
}
