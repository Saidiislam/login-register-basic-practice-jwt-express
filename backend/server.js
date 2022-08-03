require('dotenv').config()
const express = require('express');
const server =  express()
const cors = require('cors');
const cookieParser = require('cookie-parser');
const corsOptions = {
    origin: '*', 
    credentials:true,          
    optionSuccessStatus:200
}
const port = process.env.PORT || 5000

server.use(express.json())
server.use(express.urlencoded({
    extended: false
}))
server.use(cors(corsOptions))
server.use(cookieParser())
server.use('/api', require('./routes/routes'))

server.listen(port, () => console.log(`SERVER IS RUNNING AT PORT: ${port}`))