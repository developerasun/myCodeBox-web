const Blog = require('../model/blog')

// controller connects views and database
const blog_index = (req, res)=>{
    Blog.find().sort( { createdAt : -1} )
    .then((result)=>{
        res.render('blogs/blogs', { title : 'Jake\'s blog', blogs: result } )
    })
    .catch((err)=>{
        console.log(err)
    })
}

const blog_post = (req,res)=>{
    const id = req.params.id
    Blog.findById(id)
        .then((result)=>{
            res.render('blogs/details', { title : "my post", blog : result })
        })
        .catch((err)=>{
            res.status(404).render('404')
            console.log(err)
        })
}

const blog_create_post = (req, res)=>{
    console.log(req.body)
    const newBlog = new Blog(req.body)
    newBlog.save()
           .then((result)=>{
               res.redirect('/blogs')})
           .catch((err)=> {console.log(err)})
}

const blog_delete_post = (req, res)=>{
    const id = req.params.id
    
    // When dealing with Ajax request from browser, Node js can't 
    // use redirect as a response. Instead, we send here redirect property
    Blog.findByIdAndDelete(id)
        .then((result)=> res.json( { redirect : '/blogs' }))
        .catch((err)=> console.log(err))
}

module.exports = {
    blog_index, 
    blog_post, 
    blog_create_post, 
    blog_delete_post
}