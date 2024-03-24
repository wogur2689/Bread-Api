const mysql = require('mysql2');
const logger = require("./logger");

const db = mysql.createConnection({
    host: "localhost",
    port: '3306',
    user: "root",
    password: "1225",
    database: "daily",
    dateStrings: "date",
});

db.connect((err) => {
    if (err) {
        logger.error('Error connecting to database : ', err);
        return;
    }
    logger.error('connecting to database');
});
//db 연결

module.exports = db;