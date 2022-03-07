const http = require('http')
const fs = require('fs')

const server = http.createServer((req, res)=>{
    console.log('request made') // will be logged in terminal, not browser
    console.log(req.url) // depending on the url, server responds differently
    console.log(req.method)

    let path = './views/'
    switch (req.url) {
        case '/' : 
            path += 'index.html'
            res.statusCode= 200
            break
        case '/about' : 
            path += 'about.html'
            res.statusCode= 200
            break
        case '/about-me' : 
            res.statusCode= 301 // resource(url) moved
            res.setHeader('Location', '/about') // redirect
            res.end()
            break
        default :
            path += '404.html'
            res.statusCode= 404
            break
    }

    // set header content type
    res.setHeader('Content-Type', 'text/html')
    // read html file : reading file is asynchronous, meaning non-block
    fs.readFile(path, (err, data)=>{
        if (err) {
            res.end()
            return console.log(err)
        }
        // res.write(data)
        res.end(data)
    })
    
})

server.listen(3000, 'localhost', ()=>{
    console.log("listening for request on port 3000")
})

