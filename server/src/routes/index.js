const express = require('express')
const multer = require('multer')
const UploadConfig = require('./../config/upload')
const PostController = require('../controllers/PostController')
const LikeController = require('../controllers/LikeController')
const CommentsController = require('../controllers/CommentsController')

const upload = multer(UploadConfig)
const routes = new express.Router()

routes.post('/posts', upload.single('image'),PostController.store)
routes.get('/posts',PostController.index)
routes.post('/posts/:id/like',LikeController.store)
routes.post('/posts/:id/comment',CommentsController.store)
routes.put('/posts/:id/comment',CommentsController.update)
routes.delete('/posts/:id/comment/:idComment',CommentsController.delete)
routes.patch('/posts/:id/comment/:idComment',CommentsController.updateLike)

module.exports = routes