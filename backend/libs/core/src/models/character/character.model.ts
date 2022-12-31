import e from 'express'

import { EquipmentModel } from '../equipment/equipment.model'
import { CharacterClassEntity } from './character-class.entity'
import { CharacterClassModel, CharacterClassSearchModel, toCharacterClassModel } from './character-class.model'
import { CharacterEntity } from './character.entity'

export interface CharacterModel extends CharacterLocation, CharacterAppearance {
  characterClass: CharacterClassModel
}

export interface CharacterLocation extends CharacterIdentification {
  area: string
  position_x: number
  position_y: number
  position_z: number
}

export interface CharacterAppearance extends CharacterIdentification {
  race: string
  gender: string
  equipment?: EquipmentModel
}
export interface CharacterIdentification {
  name: string
}

export interface CharacterSearchModel
  extends CharacterIdentification,
    CharacterLocation,
    CharacterAppearance,
    CharacterClassSearchModel {}

export function toCharacterModel(
  entity: CharacterEntity,
  characterClass: CharacterClassEntity,
): CharacterModel {
  return {
    name: entity.name,
    race: entity.race,
    gender: entity.gender,
    area: entity.area,
    position_x: entity.position_x,
    position_y: entity.position_y,
    position_z: entity.position_z,
    characterClass: toCharacterClassModel(characterClass),
  }
}
export function toCharacterSearchModel({
  characterClass,
  ...model
}: CharacterModel) {
  return model
}

export function toCharacterAppearance({
  name,
  race,
  gender,
  characterClass,
}: CharacterModel) {
  return {
    name,
    race,
    gender,
    equipment: characterClass.equipment,
  }
}
