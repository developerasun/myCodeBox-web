import { HttpException, HttpStatus } from "@nestjs/common";

// customized HttpException
export class UserNotFoundException extends HttpException {
    constructor(msg?:string, status?:HttpStatus) {
        super(msg || 'User Not Found', status || HttpStatus.NOT_FOUND)
    }
}