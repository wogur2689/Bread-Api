import { Controller, Post, Req, UseGuards, Get, Body } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UsersService } from '../service/users.service';
import { usersDto } from '../dto/users.dto';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    //login
    @UseGuards(AuthGuard('local'))
    @Post('login')
    async login(@Body() usersDto: usersDto) {
        const result = await this.usersService.login(usersDto);
        if(result.valueOf()) {
            return { message: 'Logged in' };
        }
    }

    //logout
    @Get('logout')
    logout(@Req() req) {
        req.logout((err) => {
            if (err) {
                throw new Error('Logout failed');
            }
        });
        return { message: 'Logged out' };
    }

    //login check
    @Get('check')
    status(@Req() req) {
        if (req.isAuthenticated()) {
            return { loggedIn: true, user: req.user };
        } else {
            return { loggedIn: false };
        }
    }

    //sign Up
    @Post('signUp')
    async signUp(@Body() usersDto: usersDto) {
        const result = await this.usersService.signUp(usersDto);
        if(result) {
            return {message: '회원가입이 완료되었습니다.'};
        } else {
            return {message: '회원가입에 실패하였습니다.'};
        }
    }
}
