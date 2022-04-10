import { ClassSerializerInterceptor, Controller, Get, HttpException, HttpStatus, NotFoundException, Param, ParseIntPipe, UseFilters, UseInterceptors } from '@nestjs/common';
import { HttpExceptionFilter } from 'src/user/filter/HttpException.filter';
import { UserService } from 'src/user/service/user/user.service';
import { SerializeUser } from 'src/user/types/user';

@Controller('user')
export class UserController {

    constructor( private userService: UserService){}

    @UseInterceptors(ClassSerializerInterceptor)
    @Get()
    getUsers() {
        return this.userService.getUsers()
    }

    @UseInterceptors(ClassSerializerInterceptor)
    @Get('/:username')
    getByUsername(@Param('username') username: string) {
        const user = this.userService.getUserByUsername(username)

        // return Serialized user to hide password information
        // if user returned, the password is shown
        if (user) return new SerializeUser(user)
        else throw new HttpException('User not found', HttpStatus.NOT_FOUND)
    }

    // @UserInterceptors: Decorator that binds interceptors to the scope of the controller or method, depending on its context.
    @UseInterceptors(ClassSerializerInterceptor)
    @UseFilters(HttpExceptionFilter)
    @Get('searchID/:id')
    getByUserId(@Param('id', ParseIntPipe) id: number) {
        const user = this.userService.getUserById(id)
        if (user) return new SerializeUser(user)
        else throw new NotFoundException() // Nest js built-in HttpException
    }
}
