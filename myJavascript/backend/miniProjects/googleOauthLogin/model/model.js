const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    username : String,
    googleId : String, 
    thumbnail : String
})

const AuthUser = mongoose.model('authUser', userSchema)

module.exports = AuthUser