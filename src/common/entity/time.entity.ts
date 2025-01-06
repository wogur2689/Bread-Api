import { BaseEntity, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export abstract class BaseTimeEntity extends BaseEntity {
    @CreateDateColumn({ type: 'timestamp', name: 'created_at', update: false, nullable: false})
    createdAt: Date;

    @Column({ type: 'varchar', length: 20, name: 'created_by', nullable: false, default: 'system'})
    createdBy: String;

    @UpdateDateColumn({type: 'timestamp', name: 'updated_at', nullable: false})
    updatedAt: Date;

    @Column({ type: 'varchar', length: 20, name: 'updated_by', nullable: false, default: 'system'})
    updatedBy: String;
}