import { Module } from '@nestjs/common';
import { ProductController } from '../controller/product.controller';
import { ProductService } from '../service/product.service';
import { Product } from '../entity/product.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [TypeOrmModule.forFeature([Product])],
    controllers: [ProductController],
    providers: [ProductService]
})
export class ProductModule {}
