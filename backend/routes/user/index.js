const userRouter = require('express').Router()

userRouter.use('/regAuth', require('./regAuth'))
userRouter.use('/logAuth', require('./logAuth'))

module.exports = userRouter