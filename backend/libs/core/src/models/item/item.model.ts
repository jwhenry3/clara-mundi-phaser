import { ItemConsumableModel } from './item.consumable.model'
import { ItemEquipmentModel } from './item.equipment.model'

export interface ItemModel {
  itemId: string
  name: string
  description: string

  equipment?: ItemEquipmentModel
  consumable?: ItemConsumableModel

  droppable?: boolean
  tradeable?: boolean
  unique?: boolean
}
