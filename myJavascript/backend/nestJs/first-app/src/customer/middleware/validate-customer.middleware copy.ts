import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class ValidateCustomerMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    console.log("middleware test")
    const { auth } = req.headers; // require 'auth' header from incoming requests
    if (!auth) {
      // if the request has no 'auth' header attached, it will decline
      return res.status(403).send({error : 'no auth'})
    }
    if (auth === '123') next();
    else res.status(403).send({error: 'incorrect header value'})
  }
}
