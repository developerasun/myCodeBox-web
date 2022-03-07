const User = require('../../model/user')
const jwt = require('jsonwebtoken')

const handleErrors = (err) => {
    console.log(err.message, err.code)

    let errors = { email : '', password : '' }

    if (err.message==='incorrect email'){
        errors.email = "Not enrolled email"
    }

    if (err.message==='incorrect password'){
        errors.password = "incorrect password"
    }

    // User creates a duplicated ID(email)
    if (err.code === 11000) {  
        errors.email = "Already existing email!"
        return errors
    }

    // MongoDB validator fails
    if(err.message.includes('User validation failed')){
        console.log(Object.values(err.errors).forEach(({properties})=>{
            errors[properties.path] = properties.message
        }))
    }
    return errors
}

const maxAge = 60 * 60 * 24 * 3
const createJWT = (id) => {
    // jsonwebtoken.sign(db id, secret for hashing, token options)
    return jwt.sign({ id }, 'jake secret', {
        expiresIn : maxAge
    })
}

const signup_get = (req, res) => {
    res.render('signup')
}

const signup_post = async (req, res) => {
    const { email, password } = req.body
    try {
        // create a new user in database
        const user = await User.create( { email, password } )

        // create a json web token for authentication
        const token = createJWT(user._id)

        // set a cookie to store jwt
        res.cookie('myJSONwebToken', token, {
            httpOnly : false, // if true, block front end code to adjust cookie
            maxAge: maxAge
        })

        // send a response if sign up is succeeded
        res.status(201).json(user)
    } catch(err) {
        const errors = handleErrors(err)
        res.status(400).json( { errors } )
    }
}

const login_get = (req, res) => {
    res.render('login')
}

// compare user info that came from front end 
// with the info in database for login.
// a method for comparing the two should be created in database model. 
const login_post = async (req, res) => {
    const { email , password } = req.body
    try { 
        // model.login is a static method created in database model. 
        const user = await User.login( email, password )
        // create a json web token for authentication
        const token = createJWT(user._id)

        // set a cookie to store jwt
        res.cookie('myJSONwebToken', token, {
            httpOnly : false, // if true, block front end code to adjust cookie
            maxAge: maxAge
        })
        res.status(200).json( user )
    } catch(err) {
        const errors = handleErrors(err)
        res.status(400).json( { errors } )
    }
}

const logout_get = (req,res) => {
    // delete JSON web token for user logout. 
    // technically, it is not 'delete' but 'replace' the token with the new one
    // that has a very short expiration time. 
    res.cookie('myJSONwebToken', '', { maxAge : 1 })
    res.redirect('/')
}

const logout_post = (req,res) => {

}

module.exports = { 
    signup_get, 
    signup_post, 
    login_get, 
    login_post, 
    logout_get, 
    logout_post
}