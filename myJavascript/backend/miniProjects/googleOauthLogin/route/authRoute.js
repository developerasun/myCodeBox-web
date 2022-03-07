const authRouter = require('express').Router()
const passport = require('passport')

authRouter.get('/login', (req, res)=>{
    res.render('login', { user: req.user })
})

// activate passport google auth when the endpoint hit
authRouter.get('/google', passport.authenticate('google', {
    scope:['profile']
}))

authRouter.get('/google/redirect', passport.authenticate('google'), (req, res)=> {
    // console.log(req.user.username)
    res.redirect('/profile')
})

authRouter.get('/logout', (req, res)=>{
    req.logOut() // logout method is provided by passport
    res.redirect('/') // redirect user to homepage
})

module.exports = authRouter