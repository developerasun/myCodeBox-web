import { Get, Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  @Get('')
  getHello(): string {
    return 'Hello World!';
  }
  getJson() { 
    return {message : "hello nest js"}
  }
}
