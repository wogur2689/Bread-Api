//require("reflect-metadata");
const {BaseEntity, EntitySchema} = require("typeorm");

// TS전환시 사용
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

class Users extends BaseEntity {}

const UsersSchema = new EntitySchema({
    name: 'users',
    target: Users,
    columns: {
        id: {
            type: 'int',
            primary: true,
            generated: true
        },
        userId: {
            type: 'varchar',
            length: 20
        },
        name: {
            type: 'varchar',
            length: 20
        },
        pwd: {
            tyep: 'varchar',
            length: 20
        },
        age: {
            type: 'int'
        },
        phone: {
            type: 'varchar',
            length: 20
        },
        address: {
            type: 'varchar',
            length: 100
        }
    }
});

module.exports = { UsersSchema };