require("reflect-metadata");
const { Entity, PrimaryGeneratedColumn, Column, BaseEntity, EntitySchema} = require("typeorm");

// TS적용시 사용가능
// class User extends BaseEntity {
//     consstructor() {
//         super();
//         Entity(); // 엔티티 데코레이터
//     }

//     @PrimaryGeneratedColumn()  // 자동 증가 ID
//     id;

//     @Column({ type: "varchar", length: 20 })
//     userId;

//     @Column({ type: "varchar", length: 10 })  // 일반 컬럼
//     name;

//     @Column({ type: "varchar", length: 20 })
//     pwd;

//     @Column({ type: "varchar", length: 20 })
//     phone

//     @Column({ type: "varchar", length: 50 })
//     address

//     static setUser(data) {
//         return new User(data.userId, data.name, data.pwd, data.phone, data.address);
//     }
//     static getUser() {
//         return User;
//     }
// }

class User extends BaseEntity {}

const UserSchema = new EntitySchema({
    name: 'User',
    target: User,
    columns: {
        id: {
            type: 'int',
            primary: true,
            generated: true
        },
        name: {
            type: 'varchar'
        },
        age: {
            type: 'int'
        }
    }
});

module.exports = { UserSchema };