const { Entity, PrimaryGeneratedColumn, Column} = require("typeorm");

@Entity()  // 엔티티 데코레이터
class User {
    @PrimaryGeneratedColumn()  // 자동 증가 ID
    id;

    @Column({ type: "varchar", length: 20 })  // 일반 컬럼
    username;

    @Column({ type: "varchar", length: 20 })
    password;
}

module.exports = { User };