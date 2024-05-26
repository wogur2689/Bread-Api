const mysql = require('mysql2');
const logger = require("./logger");
const { DataSource } = require('typeorm');

/* typeOrm -> ts전환 이후 사용 */
// const myDataSource = new DataSource({
//     type: process.env.TYPEORM_CONNECTION,
//     host: process.env.TYPEORM_HOST,
//     port: process.env.TYPEORM_PORT,
//     username: process.env.TYPEORM_USERNAME,
//     password: process.env.TYPEORM_PASSWORD,
//     database: process.env.TYPEORM_DATABASE
// })

// //db 연결
// myDataSource.initialize()
//     .then(() => {
//         logger.info("Data Source has been initialized!");
//     })
//     .catch((err) => {
//         logger.error("Data Source fail initialized!");
//         logger.error(err);
//     })

/* default */
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    dateStrings: process.env.DB_DATASTRING
});

db.connect((err) => {
    if (err) {
        logger.error('Error connecting to database : ', err);
        return;
    }
    logger.info('connecting to database');
});
//db 연결

module.exports = db;