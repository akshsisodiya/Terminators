const express = require('express')
const connectDB = require('./config/db_config')
const morgan = require('morgan')
const exphbs = require('express-handlebars')
const path = require('path')
const session = require('express-session')
const passport = require('passport')
const mongoose = require('mongoose')
const MongoStore = require('connect-mongo')
const { ensureAuth } = require('./middleware/auth')
require('dotenv/config')

// config
const app = express()

// passport config
require('./config/passport')(passport)


// development console
if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'))
}


// Handlebars
app.engine('.hbs', exphbs.engine({defaultLayout: 'main', extname: '.hbs'}))
app.set('view engine', '.hbs')


// session middleware
app.use(session({
    secret: 'Terminators',
    resave: false,
    saveUninitialized:false,
    store: MongoStore.create({
        mongoUrl: process.env.DB_CONNECTION,
    }),
}))

// passport middleware
app.use(passport.initialize())
app.use(passport.session())


// static folder
app.use(express.static(path.join(__dirname, 'public')))


// Routes
app.use('/', require('./routes/index'))
app.use('/auth', require('./routes/auth'))
app.use('/api', ensureAuth, require('./routes/api'))
app.use('/test-aksh-api', require('./routes/api'))


// connect to db
connectDB()

// run server
const port = process.env.PORT
app.listen(port, ()=>console.log(`Running in ${process.env.NODE_ENV} on port ${port}`))