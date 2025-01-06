import * as bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from '../entity/users.entity';
import { Repository } from 'typeorm';
import { usersDto } from '../dto/users.dto';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(Users)
        private usersRepository: Repository<Users>, //repository 주입
    ) {}

    //로그인
    async login(usersDto: usersDto): Promise<boolean> {
        const user = await this.usersRepository.findOneBy({ userId: usersDto.userId });
        if (user && (await bcrypt.compare(usersDto.password, user.password))) {
            return true;
        }
        return false;
    }

    //회원가입
    async signUp(usersDto: usersDto): Promise<boolean> {
        //1. 비밀번호 암호화
        usersDto.password = await this.hashPassword(usersDto.password);

        //2. DB 저장
        const user = Users.toEntity(usersDto);
        this.usersRepository.save(user);
        return true;
    }

    //비밀번호 암호화
    async hashPassword(password: string): Promise<string> {
        const saltRounds = 10; // 해시를 강화하는 반복 횟수
        return bcrypt.hash(password, saltRounds);
    }
}
