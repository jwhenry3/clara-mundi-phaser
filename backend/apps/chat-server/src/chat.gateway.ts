import { AuthService } from '@app/auth'
import { CharacterService } from '@app/character'
import { ChatMessage, ChatService } from '@app/chat'
import { config } from '@app/core'
import { Inject, OnApplicationBootstrap } from '@nestjs/common'
import { ClientProxy } from '@nestjs/microservices'
import {
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets'
import { create } from 'guid'
import { first } from 'rxjs'
import { firstValueFrom } from 'rxjs'
import { timeout } from 'rxjs'
import { of } from 'rxjs'
import * as url from 'url'

import { WebSocketClient } from '../../../libs/websocket/src/websocket.client'
import { WebsocketUtils } from '../../../libs/websocket/src/websocket.utils'

@WebSocketGateway(config.chat.wsPort)
export class ChatGateway
  implements OnApplicationBootstrap, OnGatewayConnection, OnGatewayDisconnect
{
  clientByCharacterName: Record<string, WebSocketClient> = {}
  clientsByClientId: Record<string, WebSocketClient> = {}

  constructor(
    private auth: AuthService,
    private service: ChatService,
    private character: CharacterService,
    @Inject('CHAT_SERVICE')
    private characterClient: ClientProxy,
  ) {}

  async onApplicationBootstrap() {
    await this.characterClient.connect()
  }

  handleDisconnect(client: WebSocketClient) {
    console.log('client disconnected, clean up')
    if (client.characterName in this.clientByCharacterName)
      delete this.clientByCharacterName[client.characterName]
  }
  async handleConnection(client: WebSocketClient, message: any) {
    const parameters = url.parse(message.url, true)
    const characterName = (parameters.query.character ?? '') as string
    if (characterName.length === 0) {
      client.close(1008)
      return
    }
    const accountId = await this.auth.getAccountId(
      parameters.query.token as string,
    )
    if (!accountId) {
      client.close(1008)
      return
    }
    client.accountId = accountId
    if (
      !(await this.character.getCharacterByAccountAndName(
        accountId,
        characterName,
      ))
    ) {
      client.close(1008)
      return
    }
    client.characterName = characterName
    client.id = create().toString()
    this.clientByCharacterName[characterName] = client

    client.send(JSON.stringify({ event: 'authorized', data: '' }))
  }

  @SubscribeMessage('message')
  async handleMessage(client: WebSocketClient, @MessageBody() body: string) {
    const message = JSON.parse(body) as ChatMessage
    message.senderName = client.characterName
    // request character info from the character service and if available, provide the zone the player is in
    const character = await firstValueFrom(
      this.characterClient.send('character:get', client.characterName).pipe(
        timeout({
          each: 1000,
          with: () => of(null),
        }),
      ),
    )
    if (character) message.senderArea = character.area

    if (message.toName) {
      if (message.toName in this.clientByCharacterName) {
        WebsocketUtils.send(this.clientByCharacterName[message.toName], {
          event: 'chat:message',
          data: message,
        })
      }
      return
    }
    this.service.send(client, message.channel, message)
  }

  @SubscribeMessage('join')
  handleJoin(client: WebSocketClient, @MessageBody() body: string) {
    const data = JSON.parse(body || '{"channels":[]}') as { channels: string[] }
    const channels = data.channels ?? []
    const success = []
    const failures = []
    for (const channel in channels) {
      const acceptableChannels = ['lfg', 'trade', 'party', 'yell', 'help']
      if (!acceptableChannels.includes(channel)) {
        failures.push(channel)
        continue
      }
      if (!this.service.join(client, channel)) {
        failures.push(channel)
        continue
      }
      success.push(channel)
    }
    if (failures.length > 0)
      WebsocketUtils.send(client, {
        event: 'chat:join:failure',
        data: { failures },
      })
    if (success.length > 0)
      WebsocketUtils.send(client, {
        event: 'chat:join:success',
        data: { channels: success },
      })
  }
  @SubscribeMessage('leave')
  handleLeave(client: WebSocketClient, @MessageBody() body: string) {
    const data = JSON.parse(body || '{"channels":[]}') as { channels: string[] }
    const channels = data.channels ?? []
    const success = []
    const failures = []
    for (const channel in channels) {
      const acceptableChannels = ['lfg', 'trade', 'party', 'yell', 'help']
      if (!acceptableChannels.includes(channel)) {
        failures.push(channel)
        continue
      }
      if (!this.service.leave(client, channel)) {
        failures.push(channel)
        continue
      }
      success.push(channel)
    }

    if (failures.length > 0)
      WebsocketUtils.send(client, {
        event: 'chat:leave:failure',
        data: { failures },
      })
    if (success.length > 0)
      WebsocketUtils.send(client, {
        event: 'chat:leave:success',
        data: { channels: success },
      })
  }
}
