import { Injectable } from '@nestjs/common';

@Injectable()
export class ProxyServerService {
  getHello(): string {
    return 'Hello World!';
  }
}
