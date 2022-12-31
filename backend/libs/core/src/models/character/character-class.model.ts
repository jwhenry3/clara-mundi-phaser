import { EquipmentSlots } from '../equipment/equipment-slots.enum'
import { EquipmentModel } from '../equipment/equipment.model'
import { CharacterClassEntity } from './character-class.entity'
import { CharacterEquipmentEntity } from './character-equipment.entity'

export interface CharacterClassModel extends CharacterClassSearchModel {
  isCurrent: boolean
  exp: number

  equipment: EquipmentModel
}
export interface CharacterClassIdentification {
  classId: string
}
export interface CharacterClassSearchModel
  extends CharacterClassIdentification {
  level: number
}

export function toCharacterClassModel(
  entity: CharacterClassEntity,
): CharacterClassModel {
  return {
    classId: entity.classId,
    level: entity.level,
    isCurrent: entity.isCurrent,
    exp: entity.exp,
    equipment: toEquipmentModel(entity.equipment),
  }
}

export function toEquipmentModel(
  equipment: CharacterEquipmentEntity[],
): EquipmentModel {
  return equipment.reduce(
    (acc: EquipmentModel, e: CharacterEquipmentEntity) => ({
      ...acc,
      [EquipmentSlots[e.slotId]]: e.itemId,
    }),
    {} as EquipmentModel,
  )
}
