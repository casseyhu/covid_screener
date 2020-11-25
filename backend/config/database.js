const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'pass4root',
    database: 'covidscreen'
});

module.exports = connection;