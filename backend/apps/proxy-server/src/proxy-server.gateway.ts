import { AuthService } from '@app/auth'
import { CharacterService } from '@app/character'
import { WebSocketClient } from '@app/websocket'
import { Inject } from '@nestjs/common'
import { ClientProxy } from '@nestjs/microservices'
import { OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage } from '@nestjs/websockets'
import { WebSocketGateway } from '@nestjs/websockets/decorators'
import { create } from 'guid'
import * as url from 'url'

import { ProxyServerController } from './proxy-server.controller'

export interface PartialProxyMessage {
  eventName: string
  data?: string
}
export interface ProxyMessage<T> {
  eventName: string
  data: T
}

@WebSocketGateway()
export class ProxyServerGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  static instance: ProxyServerGateway
  get controller() {
    return ProxyServerController.instance
  }
  authorizedClientIds: string[] = []
  clientByCharacterName: Record<string, WebSocketClient> = {}
  constructor(
    @Inject("PROXY_SERVICE") private client: ClientProxy,
    private auth: AuthService,
    private character: CharacterService
  ) {
    ProxyServerGateway.instance = this
  }
  handleDisconnect(client: WebSocketClient) {
    const index = this.authorizedClientIds.indexOf(client.id)
    if (index > -1) this.authorizedClientIds.splice(index, 1)
    if (client.characterName in this.clientByCharacterName)
      delete this.clientByCharacterName[client.characterName]
  }
  async handleConnection(client: WebSocketClient, message: any) {
    const parameters = url.parse(message.url, true)
    const characterName = (parameters.query.character ?? "") as string
    if (characterName.length === 0) {
      client.close(1008)
      return
    }
    const accountId = await this.auth.getAccountId(
      parameters.query.token as string
    )
    if (!accountId) {
      client.close(1008)
      return
    }
    client.accountId = accountId
    if (
      !(await this.character.getCharacterByAccountAndName(
        accountId,
        characterName
      ))
    ) {
      client.close(1008)
      return
    }
    client.characterName = characterName
    client.id = create().toString()
    this.authorizedClientIds.push(client.id)
    this.clientByCharacterName[characterName] = client

    client.send(JSON.stringify({ event: "authorized", data: "" }))
  }

  @SubscribeMessage("event")
  onMessage<T>(client: WebSocketClient, event: string) {
    const { eventName, data }: PartialProxyMessage = JSON.parse(event ?? "{}")
    if (typeof eventName !== "undefined" && eventName.length > 0)
      this.client.emit(eventName, JSON.parse(data ?? "{}"))
  }
}
