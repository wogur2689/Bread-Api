import { BaseTimeEntity } from "src/common/entity/time.entity";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { menuDto } from "../dto/menu.dto";

@Entity()
export class Menu extends BaseTimeEntity {
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

    static toEntity(dto: menuDto): Menu {
        const entity = new Menu();
        entity.menuName = dto.menuName;   
        entity.parentId = dto.parentId;
        entity.menuLevel = dto.menuLevel;
        entity.menuUrl = dto.menuUrl;
        entity.menuDesc = dto.menuDesc;
        entity.sortOrder = dto.sortOrder;
        entity.isVisible = dto.isVisible;
        entity.menuRole = dto.menuRole;
        return entity;
    }
}