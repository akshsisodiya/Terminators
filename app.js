const express = require('express')
const mongoose = require('mongoose')
require('dotenv/config')
const apiRoutes = require('./routes/api')
const app = express()

app.use('/api', apiRoutes)

// connect to db
mongoose.connect(
    process.env.DB_CONNECTION,
    {useNewUrlParser:true}, 
    ()=>console.log("DB!!!"))


// run server
const port = process.env.PORT
app.listen(port, ()=>console.log(`listening on port ${port}`))