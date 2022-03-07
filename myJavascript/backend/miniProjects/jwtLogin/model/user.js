const mongoose = require('mongoose')
const { isEmail } = require('validator')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')

const userSchema = new Schema({
    email : {
        type: String, 
        // mongoose validation here
        required: [true, 'Please enter an email'], 
        unique : true, 
        lowercase: true,
        validate: [isEmail, 'Please enter a valid email'],
    }, 
    password : {
        type: String, 
        required: [true, 'Please enter an password'], 
        unique : true, 
        minlength: [6, 'Password length should be long than 6']
    }
})

// schema.pre : Defines a pre hook for the model.
// schema.pre fires before model is saved
userSchema.pre('save', function(next){
    console.log("user will be created", this)
    next()
})

// Create a mongoose hook for password hashing
userSchema.pre('save', async function(next){
    try {
        const salt = await bcrypt.genSalt()
        this.password = await bcrypt.hash(this.password, salt)
        next()
    }
    catch(err){
        console.log(err)
    }
})

// schema.post : Defines a post hook for the model.
// Works like a middleware, meaning if the next method is not fired, 
// response will stop
userSchema.post('save', function(doc, next){
    console.log("new user created and saved", doc)
    next()
})

// static method to login user
// schema.statics : Object of currently defined statics on this schema.
userSchema.statics.login = async function(email, password) { 
    const user = await this.findOne( { email })
    if (user) { 
        // compare an entered password(what user typed) and a password in database(hashed password) 
        const auth = await bcrypt.compare(password, user.password)
        if (auth) { 
            return user
        }
        throw Error('incorrect password')
    }
    throw Error('incorrect email')
}

const User = mongoose.model('User', userSchema)

module.exports = User