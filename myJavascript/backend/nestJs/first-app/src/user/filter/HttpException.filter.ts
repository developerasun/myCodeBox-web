import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from "@nestjs/common";
import { Request, Response } from "express";

// @Catch():one or more exception types specifying the exceptions to be caught and handled by this filter.
@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        console.log(exception.getResponse())
        console.log(exception.getStatus())
        console.log(exception)

        const context = host.switchToHttp()
        const req = context.getRequest<Request>()
        const res = context.getResponse<Response>()

        res.send({
            status: exception.getStatus(),
            message: exception.getResponse()
        })
    }
}