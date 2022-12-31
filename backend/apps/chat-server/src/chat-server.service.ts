import { Injectable } from '@nestjs/common';

@Injectable()
export class ChatServerService {
  getHello(): string {
    return 'Hello World!';
  }
}
