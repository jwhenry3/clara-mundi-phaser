import { ElementalModel, FunctionalModel, SkillType, StatsModel, WeaponType } from '@app/core'

import { EquipmentSlots } from '../equipment/equipment-slots.enum'

export interface ItemEquipmentModel {
  weaponType?: WeaponType
  skillType?: SkillType

  slots: EquipmentSlots[]
  stats?: StatsModel
  functional?: FunctionalModel
  element?: ElementalModel
}
