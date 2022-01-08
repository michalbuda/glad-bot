const mysql = require('mysql')
const {HOST, USER, PASSWORD, DATABASE} = require('./config.json');

const pool = mysql.createPool({
    host: HOST,
    user: USER,
    password: PASSWORD,
    database: DATABASE
})


