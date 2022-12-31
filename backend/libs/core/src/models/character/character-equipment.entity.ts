import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'

import { EquipmentSlots } from '../equipment/equipment-slots.enum'
import { EquipmentModel } from '../equipment/equipment.model'
import { CharacterClassEntity } from './character-class.entity'

@Entity('character_class_equipment')
export class CharacterEquipmentEntity {
  @PrimaryGeneratedColumn('uuid')
  entityId: string
  @ManyToOne(() => CharacterClassEntity, (c) => c.equipment)
  characterClass: CharacterClassEntity
  @Column('varchar')
  slotId: keyof EquipmentSlots
  @Column('varchar')
  itemId: string
}
