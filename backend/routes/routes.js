const serverRouter = require('express').Router()

serverRouter.use('/user', require('./user'))

module.exports = serverRouter