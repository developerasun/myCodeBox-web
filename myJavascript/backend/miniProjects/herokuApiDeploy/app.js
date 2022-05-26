const express = require('express')
const app = express()
const data = require('./data.json')


// use pre-set port. if there isn't any, use 3000.
let port = process.env.PORT || 3000

app.get("/", (req, res) => {
    res.json({
        "message": "hello there"
    })
})

app.get("/friends", (req, res) => {
    res.json(data)
})

app.listen(port, () => {
    console.log(`listening at ${port}`)
})