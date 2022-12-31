import { Column, PrimaryGeneratedColumn } from 'typeorm'

import { ItemInstanceEntity } from './item-instance.entity'

export class ItemStorageEntity {
  @PrimaryGeneratedColumn('uuid')
  storageId: string
  @Column('varchar')
  owner: string // owning character Id if applicable
}
