const mysql = require('mysql2');
const logger = require("./logger");
const { DataSource } = require('typeorm');

/* typeOrm */
const myDataSource = new DataSource({
    type: process.env.TYPEORM_CONNECTION,
    host: process.env.TYPEORM_HOST,
    port: process.env.TYPEORM_PORT,
    username: process.env.TYPEORM_USERNAME,
    password: process.env.TYPEORM_PASSWORD,
    database: process.env.TYPEORM_DATABASE
})

//db 연결
myDataSource.initialize()
    .then(() => {
        console.log("Data Source has been initialized!");
    })
    .catch((err) => {
        console.log("Data Source fail initialized!");
        console.log(err);
    })

/* default */
// const db = mysql.createConnection({
//     host: "localhost",
//     port: '3306',
//     user: "root",
//     password: "1234",
//     database: "bread",
//     dateStrings: "date",
// });

// db.connect((err) => {
//     if (err) {
//         logger.error('Error connecting to database : ', err);
//         return;
//     }
//     logger.error('connecting to database');
// });
// //db 연결

module.exports = {
    myDataSource
};