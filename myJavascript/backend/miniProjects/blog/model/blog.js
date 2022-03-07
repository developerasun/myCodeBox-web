const mongoose = require('mongoose')
const Schema = mongoose.Schema

const blogSchema = new Schema({
    title : {
        type: String, 
        required: true
    },
    snippets : {
        type: String, 
        required: true
    }, 
    body : {
        type: String, 
        required: true
    }
}, { timestamps: true })

// model name is important since it is used to find a collection.
// the name is automatically pluralized by MongoDB
const Blog = mongoose.model('Blog', blogSchema)

module.exports = Blog