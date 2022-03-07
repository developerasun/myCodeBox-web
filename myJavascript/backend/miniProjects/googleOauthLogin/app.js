const express = require('express')
const authRouter = require('./route/authRoute')
const profileRouter = require('./route/profileRoute')
const app = express()
const mongoose = require('mongoose')
const keys = require('./config/keys')
const passportSetup = require('./config/passport')
const cookieSession = require('cookie-session')
const passport = require('passport')

// View engine
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use('/auth', express.static('public')) // create a mount path 
app.use('/profile', express.static('public')) // create a mount path 

// Cookie session
app.use(cookieSession({
    maxAge: 24*60*60*1000,
    keys:[keys.session.cookieKey]
}))

// initialize passport
app.use(passport.initialize())
app.use(passport.session())

// Routers
app.use('/auth', authRouter)
app.use('/profile', profileRouter)

// connect db
mongoose.connect(keys.mongodb.uri, {})
        .then (()=> { 
            console.log("db connected")
            app.listen(3000, ()=>console.log("listening at 3000"))
        }).catch((err)=> console.log(err))

// Home
app.get('/', (req, res)=>{
    res.render("home", { user: req.user })
})