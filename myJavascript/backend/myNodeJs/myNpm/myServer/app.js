const express = require('express')
// express() : Creates an Express application. 
// The express() function is a top-level function 
// exported by the express module.
const app = express() // don't have to add semicolon
const bodyParser = require('body-parser')

// express.listen(#port, callback) : A node http.Server is returned
// localhost : 127.0.0.1
app.listen(3000, function() {
    console.log("My first Node js server") // works asynchronously
})

// express.get(path, callback) 
// '/' : absolute path
app.get('/', function(req, res) { 
    // response.send : send a response
    res.sendFile(__dirname + "/public/index.html")
})

app.get('/main', function(req, res) { 
    // response.send : send a response
    res.sendFile(__dirname + "/public/index.html")
})

// create a url routing : '/hello'
app.get('/hello', function(req, res) { 
    res.sendFile(__dirname + "/public/hello.html") // __dirname : folder directory identifier provided by Node js 
})

// create a url routing : '/wolrd'
app.get('/world', function(req, res) { 
    res.sendFile(__dirname + '/public/world.html')
})

// registering static directory so that any static resources 
// below the directory can be called
// once static files are registered, url routing can be approached without
// above routings
app.use(express.static('public'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
// ejs : embedded javascript templating, creating HTML template with minimal code
// another example : pug.js => app.set('view engine', 'pug')
// paired with designated directory : views
app.set('view engine', 'ejs')

// Send front end data to server using http post method
// Sensitive info like password might get displayed if the data sent using http get method
// http.get : req.param('email')
app.post('/email_post', function(req, res) {
    console.log(req.body.email) // check form data in email format
    // res.send(`You have entered : ${req.body.email}`)
    res.render('email.ejs', { email : req.body.email })
})

app.post('/ajax_send_email', function(req, res) {
    console.log(req.body.email)
    const responseData = {'result' : 'ok', 'email' : req.body.email}
    res.json(responseData)
})
