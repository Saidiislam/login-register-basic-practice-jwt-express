const connection = require('../../../database/db')
const { errorGenerator, succResGenerator } = require('../../../helper/responseApi')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const logAuth = require('express').Router()

logAuth.post('/', (req, res) => {
    const {email, password} = req.body
    if (!email || !password) {
        const error = errorGenerator(400, 'BAD REQUEST')
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
        const ifExist = result[0] === undefined ? false : true
        if (!ifExist) {
            const BadReq = errorGenerator(404, 'INVALID INFORMATION')
            res.status(BadReq.status).json(BadReq)
            return
        }
        const user = result[0]
        bcrypt.compare(password, user.password).then(function(result) {
            if (!result) {
                const errmsg = errorGenerator(404, 'INVALID INFORMATION')
                res.status(errmsg.status).json(errmsg)
                return
            }
            const payload = {}
            const jwtOptions = {
                expiresIn: '1222222222222s',
                issuer: 'Nadim',
                audience: `aweasrxtdcfyvgjhukbnlm${user.id}uiolkymtghjfngbdvsawesrxdtcfyvghjb`
            }
            jwt.sign(payload, process.env.SECRET_TOKEN, jwtOptions, (error, token) => {
                if (error) {
                    const BadReq = errorGenerator(500, 'SOMETHING WENT WRONG')
                    res.status(BadReq.status).json(BadReq)
                    return
                }
                const success = succResGenerator(200, 'OK', {token})
                res.status(success.status).json(success)
                return
            })
        });
    })
})

module.exports = logAuth