import { Injectable } from '@nestjs/common';

@Injectable()
export class QuestServerService {
  getHello(): string {
    return 'Hello World!';
  }
}
