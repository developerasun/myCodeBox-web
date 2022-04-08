import { ClassSerializerInterceptor, Controller, Get, HttpException, HttpStatus, Param, UseInterceptors } from '@nestjs/common';
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
        if (user) return new SerializeUser(user)
        else throw new HttpException('User not found', HttpStatus.NOT_FOUND)
    }
}
