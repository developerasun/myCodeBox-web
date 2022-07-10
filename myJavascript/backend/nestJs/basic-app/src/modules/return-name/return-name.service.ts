import { Injectable } from '@nestjs/common';

@Injectable()
export class ReturnNameService {
  getName() {
    return 'Jake Sung';
  }
}
