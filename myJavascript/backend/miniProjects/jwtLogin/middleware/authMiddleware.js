// Create a middleware to check if JWT is changed or
// not presented for browser request.
const jwt = require('jsonwebtoken')
const User = require('../model/user')

const requireAuth = (req, res, next) => {

    const token = req.cookies.myJSONwebToken

    if (token) { 
        // Asynchronously verify given token using a secret or 
        // a public key to get a decoded token
        jwt.verify(token, 'jake secret', (err, decodedToken)=>{
            if (err) {
                console.log(err.message)
                res.redirect('/login')
            } else { 
                console.log(decodedToken)
                next()
            }
        })
    } else {
        res.redirect('/login')
    }
}

// check current user
const checkUser = (req, res, next) => { 
    const token = req.cookies.myJSONwebToken

    if (token) {
        jwt.verify(token, 'jake secret', async (err, decodedToken)=>{
            if (err) {
                console.log(err.message)
                res.locals.user = null // when no user logged in
                next()              
            } else { 
                console.log(decodedToken)
                let user = await User.findById(decodedToken.id)
                // response.locals makes that whatever properties created by the method 
                // will be accessible from view engine
                res.locals.user = user 
                next()
            }
        })
    } else { 
        res.locals.user = null
        next()
    }
}

module.exports = { 
    requireAuth,
    checkUser
}