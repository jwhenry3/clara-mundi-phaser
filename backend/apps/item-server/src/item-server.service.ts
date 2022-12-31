import { Injectable } from '@nestjs/common';

@Injectable()
export class ItemServerService {
  getHello(): string {
    return 'Hello World!';
  }
}
