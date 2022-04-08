import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { NextFunction } from 'express';
import { CustomerController } from './controller/customer/customer.controller';
import { ValidateCustomerMiddleware } from './middleware/validate-customer.middleware copy';
import { ValidateExpiredCustomerMiddleware } from './middleware/validate-expired-customer.middleware';
import { CustomerService } from './service/customer/customer.service';

@Module({
    imports:[], 
    controllers:[CustomerController], // handling request and response
    providers:[CustomerService]
})

export class CustomerModule implements NestModule{
    configure(consumer: MiddlewareConsumer) {
        // middleware class/function or array of classes/functions to be attached to the passed routes
        consumer.apply(
            ValidateCustomerMiddleware, 
            ValidateExpiredCustomerMiddleware, 
            (req:Request, res:Response, next:NextFunction) => {
                console.log("last middleware")
                next() // should be called to move on
            }
        ).forRoutes(
        {
            path: 'customer/search/:id',
            method: RequestMethod.GET
        },
        {
            path: 'customer/:id', 
            method: RequestMethod.GET
        })
    }
}
