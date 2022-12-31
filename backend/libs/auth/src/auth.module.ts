import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { AuthService } from './auth.service'
import { AccountEntity } from './entities/account.entity'

@Module({
  imports: [TypeOrmModule.forFeature([AccountEntity])],
  providers: [AuthService],
  exports: [AuthService, TypeOrmModule],
})
export class AuthModule {}
