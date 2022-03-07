require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const app = express() // Creates an Express application. The app is an instance of Express
const MONGO_URI = process.env.MONGO_URI
const mongoose = require('mongoose')

// routes for blog section
const blogRouter = require('./routes/blogRoutes')

// connect with db
mongoose.connect(MONGO_URI, {})
        .then((result)=> {
            console.log("mongodb connected")
            app.listen(8080, ()=>{
            console.log("app listening at port 8080")})})
        .catch((err)=>console.log(err))

// register view engine 
// app.set sets application setting.
app.set('view engine', 'ejs')

// static asset middleware
app.use(express.static('public'))

// request url parsing middleware
app.use(express.urlencoded( { extended: false }))

// logger middleware
app.use(morgan('dev'))

// requst analyzing middleware
app.use((req, res, next)=>{
    console.log('new request made')
    console.log('host : ', req.hostname)
    console.log('path : ', req.path)
    console.log('method : ',req.method)
    next()
})

app.get('/', (req, res)=>{
    res.render('home', { title: 'Home'}) 
})

app.use((req, res, next)=> {
    console.log("do next middleware")
    next()
})

// Express router middle
app.use('/blogs', blogRouter)

app.get('/about', (req, res)=>{
    // res.sendFile('./views/about.html', {root : __dirname})
    res.render('about', { title : 'about' } )
})

// redirect
app.get('/about-us', (req, res)=>{
    res.redirect('/about') // same with res.setHeader('Location', '/about') in Node js
})

app.get('/create', (req, res)=>{
    res.render('blogs/create', { title : 'create' })
})

// page 404 should be at the bottom in Express
// app.use fires on every request regardless of url.
// order is important since Express evaluates top-down. 
app.use((req,res)=>{
    res.status(404)
       .render('404', { title : 'not found' })
})