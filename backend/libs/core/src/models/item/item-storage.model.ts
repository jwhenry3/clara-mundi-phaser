import { ItemInstanceModel } from './item-instance.model'

export interface ItemStorageModel {
  storageId: string
  capacity: number
  itemSlots: Record<number, string>
  itemInstances: Record<string, ItemInstanceModel>
}
