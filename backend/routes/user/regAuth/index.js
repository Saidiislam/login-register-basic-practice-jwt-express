const { errorGenerator, succResGenerator } = require('../../../helper/responseApi')
const validator = require('validator');
const connection = require('../../../database/db');
const bcrypt = require('bcrypt');
const regAuth = require('express').Router()

regAuth.post('/', (req, res) => {

    const {name, password, email} = req.body
    if (!name || !password || !email) {
        const error = errorGenerator(400, 'BAD REQUEST')
        res.status(error.status).json(error)
        return
    }
    const isEmail = validator.isEmail(email)
    if (!isEmail) {
        const error = errorGenerator(400, 'NOT A VALID EMAIL')
        res.status(error.status).json(error)
        return
    }
    const queryString = `SELECT * FROM user WHERE email='${email}'`
    connection.query(queryString, (error, result) => {
        if (error) {
            const error = errorGenerator(500, 'INTERNAL ERROR')
            res.status(error.status).json(error)
            return
        }
        const ifExist = result[0] === undefined ? true : false
        if (!ifExist) {
            const BadReq = errorGenerator(409, 'USER ALREADY EXISTS')
            res.status(BadReq.status).json(BadReq)
            return
        }
        bcrypt.genSalt(10, function(err, salt) {
            if (err) {
                const BadReq = errorGenerator(500, 'SOMETHING WENT WRONG')
                res.status(BadReq.status).json(BadReq)
                return
            }
            bcrypt.hash(password, salt, function(err, hashedPass) {
                if (err) {
                    const BadReq = errorGenerator(500, 'SOMETHING WENT WRONG')
                    res.status(BadReq.status).json(BadReq)
                    return
                }
                // Store hash in your password DB.
                const InsertQuery = `INSERT INTO user(name, email, password) VALUES('${name}', '${email}', '${hashedPass}')`
                connection.query(InsertQuery, (insertErr, insertResult) => {
                    if (insertErr) {
                        const error = errorGenerator(500, 'INTERNAL ERROR')
                        res.status(error.status).json(error)
                        return
                    }
                    const success = succResGenerator(201, 'ACCOUNT CREATED')
                    res.status(success.status).json(success)
                })
            });
        });
    })
    

})

module.exports = regAuth