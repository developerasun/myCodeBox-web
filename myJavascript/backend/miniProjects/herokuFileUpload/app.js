// check dependency before you start

const express = require('express')
const multer = require('multer') // file upload npm package
const uuid = require('uuid').v4
const dotenv = require('dotenv').config() // load env var to node js process.env 

// ========= file upload ======== //
// upload.single: single file upload
// upload.array: multiple file upload(linked with html input multiple attr)
// The disk storage engine gives you full control on storing files to disk.
// without diskStorage method, uploaded file will come in text format. 
const storage = multer.diskStorage({
    // set where to save file
    destination: (req, file, cb) => {
        cb(null, 'upload/') // takes error and path to store file
    },
    // set filename
    filename: (req, file, cb) => {
        const { originalname } = file // filename should be in string 
        cb(null, `${uuid()}-${originalname}`) // callback takes error and filename
        // uuid is needed to prevent for the same files to be overwritten. 
        // note that uuid should be prior to the originalname because of
        // file extension e.g: .png
    }
})

const upload = multer({ storage })
const uploadLimit = 5
const inputFieldName = 'avatar'
// ========= file upload ======== //


// pre-set port or 8080
let port = process.env.PORT || 8080
const app = express()

app.use(express.static('public')) // shouldn't be '/public'
app.listen(port, ()=>{
    console.log(`listening at ${port}`)
})

// create a dummy error type
class Dummy {
    createdAt = new Date() // field 
    returnErr(){ return new Error("Some Error")} // method
}

// upload file to server 
// upload.single('file type input field's name')
// file is delivered to server in the form of text, not its original form.
app.post('/upload', (req, res) => {
    const multipleUpload = upload.array(inputFieldName, uploadLimit)
    let hasUploadError = null;
    // error handling
    multipleUpload(req, res, (err) => {
        // errors caused by multer
        if (err instanceof multer.MulterError) {
            hasUploadError = err
            console.error(`file upload failed: ${hasUploadError.message}`)
            res.send("Upload up to 5 files") // FIX: change to res.json or send error page HTML file
        } else if (err instanceof Dummy) { // other error types
            console.error("some error here")
            res.redirect('/')
        } else { 
            res.json({ 
                status: 204,
                success: true
            })
        }
    })
})

