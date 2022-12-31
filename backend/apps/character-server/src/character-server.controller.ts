import { CharacterService } from '@app/character'
import { CharacterModel } from '@app/core'
import { Controller, Get } from '@nestjs/common'
import { Req } from '@nestjs/common'
import { Res } from '@nestjs/common'
import { Inject } from '@nestjs/common'
import { ClientProxy, MessagePattern } from '@nestjs/microservices'
import { Request, Response } from 'express'

@Controller('character-server')
export class CharacterServerController {
  characters: Record<string, CharacterModel> = {}

  constructor(
    @Inject('CHARACTER_SERVICE') private client: ClientProxy,
    private character: CharacterService,
  ) {}

  @Get('characters/search')
  searchCharacters(@Req() request: Request, @Res() response: Response) {
    const term = (request.query.term ?? '') as string
    if (term.length < 3) {
      response.status(406)
      response.send({
        status: false,
        reason: 'term-length',
        characters: [],
      })
      return
    }
    // convert this to a global search in the DB instead
    const found = Object.values(this.characters).filter((character) =>
      character.name.toLowerCase().includes(term.toLowerCase()),
    )
    response.status(200)
    response.send({
      status: true,
      reason: '',
      characters: found,
    })
  }

  @MessagePattern('character:get')
  getCharacter(name: string) {
    if (!(name in this.characters)) return null
    return this.characters[name]
  }
}
