import { Body, Controller, Get, HttpException, HttpStatus, Param, ParseIntPipe, Post, Req, Res, UsePipes, ValidationPipe } from '@nestjs/common';
import { Response, Request } from 'express';
import { CreateCustomerDto } from 'src/customer/dto/createCustomer.dto';
import { CustomerService } from 'src/customer/service/customer/customer.service';

@Controller('customer')
export class CustomerController {
    // controller constructor connect controller and service in Nest.js
    constructor(private customerService:CustomerService){}

    @Get(':id') // dynamic routes
    getCustomer(
        @Param('id', ParseIntPipe) id:number,
        @Req() req:Request, // from express
        @Res() res:Response // from express
    ) {
        const customer = this.customerService.findCustomerById(id)
        // if @Res is imported and used, should define a response
        if (customer) {
            res.json({customer})
        } else { 
            res.status(400).json({
                statusCode: 400,
                message: "no customer",
                customer : null
            })
        }
    }
    @Get('/search/:id')
    searchCustomerById(@Param('id', ParseIntPipe) id: number) {
        const customer = this.customerService.findCustomerById(id)

        // if @Res is not imported and not used, can return instance right away
        // Nest js takes care of response under the hood 
        if (customer) return customer
        else throw new HttpException('Customer not found', HttpStatus.BAD_REQUEST)
    }

    @Post('create')
    @UsePipes(ValidationPipe) // validate data with class-validator package
    createCustomer(@Body() createCustomerDto:CreateCustomerDto // set request body format
    ) {
        console.log(createCustomerDto) // body content-type:application/json
    }
}

// service: biz logic