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
        let result: boolean = true;
        try {
            const user = await this.usersRepository.findOneBy({ userId: usersDto.userId });
            if (user && (await bcrypt.compare(usersDto.password, user.password))) {
                return result;
            }
        } catch(err) {
            console.log(err);
            result = false;
        }
        return result;
    }

    //회원가입
    async signUp(usersDto: usersDto): Promise<boolean> {
        let result: boolean = true;
        try {
            //1. 비밀번호 암호화
            usersDto.password = await this.hashPassword(usersDto.password);

            //2. DB 저장
            const user = Users.toEntity(usersDto);
            this.usersRepository.save(user);
        } catch(err) {
            console.log(err);
            result = false;
        }
        return result;
    }

    //마이페이지
    async myPage(usersDto: usersDto): Promise<usersDto> {
        let result: usersDto;
        try {
            //유저 아이디로 DB 조회
            const user = await this.usersRepository.findOneBy({ userId: usersDto.userId });
            if (user) {
                result = usersDto;
            }
            return null;
        } catch(err) {
            console.log(err);
            result = null;
        }
        return result;
    }

    //비밀번호 암호화
    async hashPassword(password: string): Promise<string> {
        const saltRounds = 10; // 해시를 강화하는 반복 횟수
        return bcrypt.hash(password, saltRounds);
    }
}
