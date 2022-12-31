import { CharacterEntity } from '@app/core'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

export class CreateCharacterOptions {
  name: string
  gender: string = 'male'
  race: string = 'human'
}
@Injectable()
export class CharacterService {
  constructor(
    @InjectRepository(CharacterEntity)
    private repo: Repository<CharacterEntity>,
  ) {}

  async saveCharacter(character: CharacterEntity) {
    return await this.repo.save(character)
  }
  async createCharacter(accountId: string, options: CreateCharacterOptions) {
    if (!accountId) {
      return {
        status: false,
        reason: 'invalid-accountId',
        character: null,
      }
    }
    if (!options.name) {
      return {
        status: false,
        reason: 'invalid-name',
        character: null,
      }
    }
    const existing = await this.findByName(options.name)
    if (!!existing) {
      return {
        status: false,
        reason: 'conflict',
        character: null,
      }
    }
    const character = this.repo.create({
      accountId,
      name: options.name,
      race: ['human'].includes(options.race) ? options.race : 'human',
      gender: ['male', 'female'].includes(options.gender)
        ? options.gender
        : 'male',
    })
    await this.repo.save(character)
    return {
      status: true,
      reason: '',
      character,
    }
  }

  async getCharacters(accountId: string) {
    if (!accountId) {
      return {
        status: false,
        reason: 'invalid-accountId',
        characters: [],
      }
    }
    const characters = await this.repo.findBy({ accountId })
    return {
      status: true,
      reason: '',
      characters,
    }
  }

  async deleteCharacter(accountId: string, name: string) {
    const character = await this.findByAccountAndName(accountId, name)
    if (!character) {
      return {
        status: false,
        reason: 'not-found',
      }
    }
    await this.repo.delete(character)

    return {
      status: true,
      reason: '',
    }
  }
  async getCharacterByAccountAndName(accountId: string, name: string) {
    const character = await this.findByAccountAndName(accountId, name)
    if (!character) {
      return {
        status: false,
        reason: 'not-found',
        character: null,
      }
    }
    return {
      status: true,
      reason: '',
      character,
    }
  }

  async getCharacter(name: string) {
    const character = await this.findByName(name)
    if (!character) {
      return {
        status: false,
        reason: 'not-found',
        character: null,
      }
    }
    return {
      status: true,
      reason: '',
      character,
    }
  }

  async updateCharacter(
    name: string,
    area: string,
    position_x: number,
    position_y: number,
    position_z: number,
    rotation: number,
  ) {
    return await this.repo
      .createQueryBuilder('character')
      .update({
        area,
        position_x,
        position_y,
        position_z,
        rotation,
      })
      .where({ name })
      .execute()
  }

  async searchCharacters(term: string) {
    return await this.repo
      .createQueryBuilder('character')
      .select(['name', 'gender', 'race', 'area', 'level'])
      .where('character.name like :term', { term: `%${term}%` })
      .getMany()
  }
  private findByAccountAndName(accountId: string, name: string) {
    return this.repo.findOneBy({ accountId, name })
  }
  private findByName(name: string) {
    return this.repo.findOneBy({ name })
  }
}
