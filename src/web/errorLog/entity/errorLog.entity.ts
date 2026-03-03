import { BaseTimeEntity } from "src/common/entity/time.entity";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ErrorLog extends BaseTimeEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'error_id', type: 'bigint', nullable: false })
    ErrorId: number;        //에러 ID

    @Column({ name: 'error_name', type: 'varchar', length: 100, nullable: false })
    ErrorName: string;     //에러명

    @Column({ name: 'error_name', type: 'text', nullable: false })
    ErrorTarger: string;   //에러 내용

    @Column({ name: 'error_marker', type: 'varchar', length: 100, nullable: false })
    ErrorLocation: string; //에러 발생 위치
    
    
}