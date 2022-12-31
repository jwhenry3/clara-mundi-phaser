import { AuthService } from '@app/auth'
import { CharacterService } from '@app/character'
import { config } from '@app/core'
import { WebSocketClient } from '@app/websocket'
import { Inject } from '@nestjs/common'
import { ClientProxy } from '@nestjs/microservices'
import { SubscribeMessage } from '@nestjs/websockets'
import { WebSocketGateway } from '@nestjs/websockets'
import { create } from 'guid'
import * as url from 'url'

export interface CharacterUpdateMessage {
  name: string
  area: string
  position_x: number
  position_y: number
  position_z: number
  rotation: number
  equipped: string[]
}
@WebSocketGateway(config.character.wsPort)
export class CharacterServerGateway {
  authorized: WebSocketClient[] = []

  constructor(
    @Inject('CHARACTER_SERVICE') private client: ClientProxy,
    private auth: AuthService,
    private character: CharacterService,
  ) {}

  handleDisconnect(client: WebSocketClient) {
    const index = this.authorized.indexOf(client)
    if (index > -1) this.authorized.splice(index, 1)
  }

  handleConnection(client: any, message: any) {
    const parameters = url.parse(message.url, true)
    if (!this.auth.validateServer(parameters.query.token as string)) {
      client.close(1008)
      return
    }
    client.id = create().toString()
    if (!this.authorized.includes(client)) this.authorized.push(client)
    client.send(JSON.stringify({ event: 'authorized', data: '' }))
  }

  @SubscribeMessage('update')
  async updateCharacter(
    client: WebSocketClient,
    {
      name,
      area,
      position_x,
      position_y,
      position_z,
      rotation,
      equipped,
    }: CharacterUpdateMessage,
  ) {
    await this.character.updateCharacter(
      name,
      area,
      position_x,
      position_y,
      position_z,
      rotation,
    )
    // update equipment server
  }
}
