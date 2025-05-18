import { BaseTimeEntity } from "src/common/entity/time.entity";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { productDto } from "../dto/product.dto";

@Entity()
export class Product extends BaseTimeEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'name', type: 'varchar', length: 100, nullable: false })
    name: string;

    @Column({ name: 'price', type: 'int', nullable: true})
    price: number;

    @Column({ name: 'image_url', type: 'varchar', length: 200, nullable: false })
    imageUrl: string;

    static toEntity(dto: productDto): Product {
        const entity = new Product();
        entity.name = dto.name;   
        entity.price = dto.price;
        entity.imageUrl = dto.imageUrl;
        return entity;
    }
}