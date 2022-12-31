import { AuthModule } from '@app/auth'
import { CoreUtils } from '@app/core'
import { Module } from '@nestjs/common'

import { ProxyServerController } from './proxy-server.controller'
import { ProxyServerService } from './proxy-server.service'

@Module({
  imports: [AuthModule, CoreUtils.importClient('PROXY_SERVICE')],
  controllers: [ProxyServerController],
  providers: [ProxyServerService],
})
export class ProxyServerModule {}
