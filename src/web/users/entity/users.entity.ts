import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Users {
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

    @Column({ name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', nullable: false })
    createdAt: Date;

    @Column({ name: 'created_by', type: 'timestamp', length: 10, nullable: false})
    createdBy: string;
    
    @Column({ name: 'updated_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    updatedAt: Date;

    @Column({ name: 'updated_by', type: 'timestamp', length: 10})
    updatedBy: string;
}