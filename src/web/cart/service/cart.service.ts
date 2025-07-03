import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Menu } from '../entity/cart.entity';
import { menuDto } from '../dto/cart.dto';

@Injectable()
export class MenuService {
    constructor(
        @InjectRepository(Menu)
        private menuRepository: Repository<Menu>, //repository 주입
    ) {}
    
    //메뉴 리스트
    async menuList(): Promise<menuDto[]> {
        try {
            return await this.menuRepository.find();
        } catch(err) {
            console.log(err);
            return [];
        }
    }
}
