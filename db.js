const mysql = require('mysql');
const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'nilesh123',
    database: 'just_clean_app_test'
});

con.connect();

module.exports = con;
