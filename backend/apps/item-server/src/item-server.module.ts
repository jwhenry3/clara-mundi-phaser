import { AuthModule } from '@app/auth'
import { CoreUtils } from '@app/core'
import { DatabaseModule } from '@app/database'
import { Module } from '@nestjs/common'

import { ItemServerController } from './item-server.controller'
import { ItemServerService } from './item-server.service'

@Module({
  imports: [AuthModule, CoreUtils.importClient('ITEM_SERVICE')],
  controllers: [ItemServerController],
  providers: [ItemServerService],
})
export class ItemServerModule {
  static forRoot() {
    return {
      module: ItemServerModule,
      imports: [DatabaseModule],
    }
  }
}
