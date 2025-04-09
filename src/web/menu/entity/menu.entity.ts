import { BaseTimeEntity } from "src/common/entity/time.entity";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class menu extends BaseTimeEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'menu_name', type: 'varchar', length: 100, nullable: false })
    menuName: string;

    @Column({ name: 'parent_id', type: 'int'})
    parentId: number;
    
    @Column({ name: 'menu_level', type: 'varchar', length: 2, nullable: false })
    menuLevel: string;

    @Column({ name: 'menu_url', type: 'varchar', length: 512, nullable: false})
    menuUrl: string;

    @Column({ name: 'menu_desc', type: 'varchar', length: 200 })
    menuDesc: string;

    @Column({ name: 'sort_order', type: 'int'})
    sortOrder: number;

    @Column({ name: 'is_visible', type: 'varchar', length: 1, nullable: false, default: "N" })
    isVisible: string;

    @Column({ name: 'menu_role', type: 'varchar', nullable: false })
    menuRole: string;

    // static toEntity(dto: usersDto): Users {
    //     const entity = new Users();
    //     entity.userId = dto.userId; 
    //     entity.password = dto.password;
    //     entity.name = dto.name;
    //     entity.email = dto.email;
    //     entity.nickName = dto.nickName;
    //     entity.birthDate = dto.birthDate;
    //     entity.phoneNumber = dto.phoneNumber;
    //     entity.address = dto.address;
    //     entity.role = 'user';
    //     return entity;
    // }
}