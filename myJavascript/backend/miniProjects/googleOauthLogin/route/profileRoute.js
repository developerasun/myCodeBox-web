const profileRouter = require('express').Router()

const authCheck = (req, res, next) => {
    if(!req.user) { 
        res.redirect('/auth/login')
    } else { 
        next()
    }
}

// if a user is loggined, it says hi to the user
// if not, redirect to login page
profileRouter.get('/', authCheck, (req, res)=>{
    console.log(req.user)
    res.render('profile', { user : req.user})
})

module.exports = profileRouter