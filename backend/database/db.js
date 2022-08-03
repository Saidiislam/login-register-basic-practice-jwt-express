const mysql = require('mysql2');

const host = process.env.HOST
const user = process.env.USER
const password = process.env.PASSWORD
const database = process.env.DATABASE

const connection = mysql.createConnection({
    host,
    user,
    password,
    database
})

module.exports = connection