const express = require('express')
const router = express.Router()
const blogController = require('../controllers/blogController')

router.get('/', blogController.blog_index)

router.get('/:id', blogController.blog_post)

router.post('/', blogController.blog_create_post)

router.delete('/:id', blogController.blog_delete_post)

module.exports = router