import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn, Unique } from 'typeorm'

@Entity('account')
@Unique('email', ['email'])
export class AccountEntity {
  @PrimaryGeneratedColumn('uuid')
  accountId: string
  @Column('varchar')
  email: string
  @Column('varchar')
  password: string
  @Column('bigint')
  lastLogin: number
  @Column('varchar')
  token: string
}
