const passport = require('passport')
const googleStrategy = require('passport-google-oauth20')
const keys = require('./keys')
const AuthUser = require('../model/model')

// save user by serializing it
// serializeUser determines which data of the user object
// should be stored in the session. The result of the 
// serializeUser method is attached to the session 
passport.serializeUser((user, done)=>{
    done(null, user.id)
})

// The first argument of deserializeUser corresponds to the key
// of the user object that was given to the done function
// In deserializeUser that key is matched with 
// the in memory array / database or any data resource.
passport.deserializeUser((id, done)=>{

    // here the id is from above done function's second parameter
    // and used as an unique key to find a record in database
    AuthUser.findById(id).then((user)=>{
        done(null, user) // the user object will be attached to request object
    })
})

passport.use(new googleStrategy({
    // options for google strategy
    callbackURL : "/auth/google/redirect", 
    clientID: keys.google.clientID,
    clientSecret : keys.google.clientSecret
}, (accessToken, refreshToken, profile, done)=> {

    AuthUser.findOne( { googleId : profile.id })
            .then((currentUser) => {
                if(currentUser) { 
                    console.log(currentUser)
                    console.log(profile)
                    done(null, currentUser)
                } else { 
                    new AuthUser( {
                        username : profile.displayName, 
                        googleId : profile.id, 
                        thumbnail : profile.photos[0].value
                    }).save().then((newUser) => 
                    {
                        console.log("user created : ",newUser)
                        done(null, newUser)
                    })
                }
            })
}))
