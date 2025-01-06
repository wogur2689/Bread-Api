import { BaseTimeEntity } from "src/common/entity/time.entity";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { usersDto } from "../dto/users.dto";

@Entity()
export class Users extends BaseTimeEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'user_id', type: 'varchar', length: 20, nullable: false })
    userId: string;

    @Column({ name: 'password', type: 'varchar', length: 20, nullable: false })
    password: string;
    
    @Column({ name: 'name', type: 'varchar', length: 20, nullable: false })
    name: string;

    @Column({ name: 'email', type: 'varchar', length: 50, nullable: false })
    email: string;

    @Column({ name: 'nick_name', type: 'varchar', length: 20, nullable: false })
    nickName: string;

    @Column({ name: 'birth_date', type: 'varchar', length: 20, nullable: false })
    birthDate: string;

    @Column({ name: 'phone_number', type: 'varchar', length: 20, nullable: false })
    phoneNumber: string;

    @Column({ name: 'address', type: 'varchar', length: 200, nullable: false })
    address: string;

    @Column({ name: 'role', type: 'varchar', length: 20, nullable: false })
    role: string;

    static toEntity(dto: usersDto): Users {
        const entity = new Users();
        entity.userId = dto.userId;
        entity.password = dto.password;
        entity.name = dto.name;
        entity.email = dto.email;
        entity.nickName = dto.nickName;
        entity.birthDate = dto.birthDate;
        entity.phoneNumber = dto.phoneNumber;
        entity.address = dto.address;
        entity.role = 'user';
        return entity;
    }
}