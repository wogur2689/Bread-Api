import { Controller, Post, Req, Get, Body, Query } from '@nestjs/common';
import { UsersService } from '../service/users.service';
import { usersDto } from '../dto/users.dto';
import { ApiResponse, createApiDataResponse, createApiResponse } from 'src/common/api/apiResponse';
import { ApiResCode } from 'src/common/api/apiResCode';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    //login
    @Post('login')
    async login(@Body() usersDto: usersDto): Promise<ApiResponse<any>> {
        const result = await this.usersService.login(usersDto);
        if (result.valueOf()) {
            return createApiDataResponse(ApiResCode.API_0000.code, ApiResCode.API_0000.msg, usersDto.userId);
        } else {
            return createApiResponse(ApiResCode.API_9999.code, ApiResCode.API_9999.msg);
        }
    }

    //sign Up
    @Post('signUp')
    async signUp(@Body() usersDto: usersDto): Promise<ApiResponse<any>> {
        const result = await this.usersService.signUp(usersDto);
        if (result.valueOf()) {
            return createApiResponse(ApiResCode.API_0000.code, ApiResCode.API_0000.msg);
        } else {
            return createApiResponse(ApiResCode.API_9999.code, ApiResCode.API_9999.msg);
        }
    }

    //login check
    @Get('check')
    async status(@Req() req): Promise<ApiResponse<any>> {
        if(req.isAuthenticated()) {
            return createApiResponse(ApiResCode.API_0000.code, ApiResCode.API_0000.msg);    
        }
        return createApiDataResponse(ApiResCode.API_9999.code, ApiResCode.API_9999.msg);
    }

    //mypage
    @Get('mypage')
    async myPage(@Query() usersDto: usersDto): Promise<ApiResponse<any>> {
        if(usersDto.userId == null) return createApiResponse(ApiResCode.API_9999.code, ApiResCode.API_9999.msg);
        const result = await this.usersService.myPage(usersDto);
        return createApiDataResponse(ApiResCode.API_0000.code, ApiResCode.API_0000.msg, result);
    }
}
