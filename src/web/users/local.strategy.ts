import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { UsersService } from './service/users.service';

/**
 * 인증처리
 */
@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private usersService: UsersService) {
        super(); // 기본적으로 username과 password 필드를 사용
    }

    async validate(username: string, password: string): Promise<any> {
        const user = this.usersService.validateUser(username, password);
        if (!user) {
            throw new Error('Unauthorized');
        }
        return user;
    }
}