import { Controller, Get } from '@nestjs/common'

import { ItemServerService } from './item-server.service'

@Controller('item-server')
export class ItemServerController {
  constructor(private readonly itemServerService: ItemServerService) {}

  @Get()
  getHello(): string {
    return this.itemServerService.getHello()
  }
}
