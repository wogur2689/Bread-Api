import { Controller, Post, Req, Get, Body, Query } from '@nestjs/common';
import { UsersService } from '../service/users.service';
import { usersDto } from '../dto/users.dto';
import { ApiRes, createApiDataRes, createApiRes } from 'src/common/api/apiResponse';
import { ApiResCode } from 'src/common/api/apiResCode';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Post('login')
    @ApiOperation({ summary: '로그인' })
    @ApiResponse({ status: 200, description: '로그인 성공' })
    async login(@Body() usersDto: usersDto): Promise<ApiRes<any>> {
        const result = await this.usersService.login(usersDto);
        if (result.valueOf()) {
            return createApiDataRes(ApiResCode.API_0000.code, ApiResCode.API_0000.msg, usersDto.userId);
        } else {
            return createApiRes(ApiResCode.API_9999.code, ApiResCode.API_9999.msg);
        }
    }

    @Post('signUp')
    @ApiOperation({ summary: '회원가입' })
    @ApiResponse({ status: 200, description: '회원가입 성공' })
    async signUp(@Body() usersDto: usersDto): Promise<ApiRes<any>> {
        const result = await this.usersService.signUp(usersDto);
        if (result.valueOf()) {
            return createApiRes(ApiResCode.API_0000.code, ApiResCode.API_0000.msg);
        } else {
            return createApiRes(ApiResCode.API_9999.code, ApiResCode.API_9999.msg);
        }
    }

    @Get('check')
    @ApiOperation({ summary: '로그인 체크' })
    @ApiResponse({ status: 200, description: '로그인 세션 유지' })
    async status(@Req() req): Promise<ApiRes<any>> {
        if(req.isAuthenticated()) {
            return createApiRes(ApiResCode.API_0000.code, ApiResCode.API_0000.msg);    
        }
        return createApiDataRes(ApiResCode.API_9999.code, ApiResCode.API_9999.msg);
    }

    @Get('mypage')
    @ApiOperation({ summary: '마이페이지' })
    @ApiResponse({ status: 200, description: '마이페이지 정보 조회 성공' })
    async myPage(@Query() usersDto: usersDto): Promise<ApiRes<any>> {
        if(usersDto.userId == null) return createApiRes(ApiResCode.API_9999.code, ApiResCode.API_9999.msg);
        const result = await this.usersService.myPage(usersDto);
        return createApiDataRes(ApiResCode.API_0000.code, ApiResCode.API_0000.msg, result);
    }
}
