require("reflect-metadata");
const { Entity, PrimaryGeneratedColumn, Column, BaseEntity} = require("typeorm");

@Entity()  // 엔티티 데코레이터
class User extends BaseEntity {
    @PrimaryGeneratedColumn()  // 자동 증가 ID
    id;

    @Column({ type: "varchar", length: 20 })
    userId;

    @Column({ type: "varchar", length: 10 })  // 일반 컬럼
    name;

    @Column({ type: "varchar", length: 20 })
    pwd;

    @Column({ type: "varchar", length: 20 })
    phone

    @Column({ type: "varchar", length: 50 })
    address
}

module.exports = User;