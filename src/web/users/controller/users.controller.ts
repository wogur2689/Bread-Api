import { Controller, Post, Req, Get, Body } from '@nestjs/common';
import { UsersService } from '../service/users.service';
import { usersDto } from '../dto/users.dto';
import { ApiResponse, createApiResponse } from 'src/common/api/apiResponse';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    //login
    @Post('login')
    async login(@Body() usersDto: usersDto): Promise<ApiResponse<any>> {
        const result = await this.usersService.login(usersDto);
        if (result.valueOf()) {
            return createApiResponse(200, '로그인 성공', null);
        } else {
            return createApiResponse(200, '로그인 실패', null);
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
    async signUp(@Body() usersDto: usersDto): Promise<ApiResponse<any>> {
        const result = await this.usersService.signUp(usersDto);
        if (result.valueOf()) {
            return createApiResponse(200, '회원가입 성공', null);
        } else {
            return createApiResponse(200, '회원가입 실패', null);
        }
    }
}
