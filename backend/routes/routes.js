const serverRouter = require('express').Router()

serverRouter.use('/user', require('./user'))
serverRouter.use('/token', require('./token'))

module.exports = serverRouter