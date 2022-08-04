const tokenRouter = require('express').Router()
const jwt = require('jsonwebtoken');
const { errorGenerator, succResGenerator } = require('../../helper/responseApi');

tokenRouter.post('/', (req, res) => {
    const {token} = req.body
    if (!token) {
        const error = errorGenerator(400, 'BAD REQUEST')
        res.status(error.status).json(error)
        return
    }
    const secret = process.env.SECRET_TOKEN
    jwt.verify(token, secret, (err, isValid) => {
        if (err) {
            const error = errorGenerator(401, 'UNAUTHORIZED', {isValid: false})
            res.status(error.status).json(error)
            return
        }
        const success = succResGenerator(200, 'AUTHORIZED', {isValid})
        res.status(success.status).json(success)
        return
    })
})

module.exports = tokenRouter