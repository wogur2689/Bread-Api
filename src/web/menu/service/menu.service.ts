import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class MenuService {
    constructor(
            @InjectRepository()
            private usersRepository: Repository<>, //repository 주입
        ) {}
}
