import { Column, Entity } from 'typeorm'

@Entity('item_instance')
export class ItemInstanceEntity {
  @Column('varchar')
  itemId: string
  @Column('int')
  quantity: number
  @Column('tinyint')
  isEquipped: boolean
}
