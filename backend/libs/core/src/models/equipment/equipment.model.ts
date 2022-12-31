import { EquipmentSlots } from './equipment-slots.enum'

export type EquipmentModel = {
  [key in EquipmentSlots]?: string
}
