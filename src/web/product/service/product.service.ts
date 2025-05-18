import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../entity/product.entity';
import { productDto } from '../dto/product.dto';

@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(Product)
        private productRepository: Repository<Product>, //repository 주입
    ) {}
    
    //메뉴 리스트
    async productList(): Promise<productDto[]> {
        try {
            return await this.productRepository.find();
        } catch(err) {
            console.log(err);
            return [];
        }
    }
}
