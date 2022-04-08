import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class ValidateExpiredCustomerMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    const {valid} = req.headers // require 'valid' header from incoming requests
    console.log("validate expired customer")
    if (valid) next() 
    else res.status(401).send({error:'account invalid'})
  }
}
