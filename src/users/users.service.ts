import * as bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
    private readonly users = [
        { id: 1, username: 'user1', password: 'password1' },
        { id: 2, username: 'user2', password: 'password2' },
    ];

    //비밀번호 암호화
    async hashPassword(password: string): Promise<string> {
        const saltRounds = 10; // 해시를 강화하는 반복 횟수
        return bcrypt.hash(password, saltRounds);
    }

    async validateUser(username: string, password: string): any {
        const user = this.users.find((user) => user.username === username);
        if (user && (await bcrypt.compare(password, user.password))) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }
}
