import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Users {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 20, nullable: false })
    userId: string;

    @Column({ type: 'varchar', length: 20, nullable: false })
    password: string;
    
    @Column({ type: 'varchar', length: 20, nullable: false })
    name: string;

    @Column({ type: 'varchar', length: 50, nullable: false })
    email: string;

    @Column({ type: 'varchar', length: 20, nullable: false })
    nickName: string;

    @Column({ type: 'varchar', length: 20, nullable: false })
    birthDate: string;

    @Column({ type: 'varchar', length: 20, nullable: false })
    phoneNumber: string;

    @Column({ type: 'varchar', length: 200, nullable: false })
    address: string;

    @Column({ type: 'varchar', length: 20, nullable: false })
    role: string;


    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;
}