import { Injectable, Query, Req } from '@nestjs/common';
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
    
    //상품 리스트
    async productList(): Promise<productDto[]> {
        try {
            return await this.productRepository.find();
        } catch(err) {
            console.log(err);
            return [];
        }
    }

    //상품 상세 조회
    async productDetail(key: number): Promise<productDto | null> {
        try {
            return await this.productRepository.findOneBy({id : key});
        } catch(err) {
            console.log(err);
            return null;
        }
    }
}
