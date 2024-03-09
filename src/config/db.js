const mysql = require('mysql2');

const db = mysql.createConnection({
    host: "localhost",
    port: '3306',
    user: "root",
    password: "1225",
    database: "daily",
    dateStrings: "date",
});

db.connect();
//db 연결

module.exports = db;