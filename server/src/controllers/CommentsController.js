const mongoose = require('mongoose');
const Post = require('../models/Post')
const Comment = require('../models/Comment')

const setValueByProp = (oldValue, newValue, prop) => newValue[prop] ? newValue[prop] : oldValue[prop]

module.exports = {
    async store(req, res){
        let post = await Post.findById(req.params.id)
        const newComment = new Comment({ ...req.body })
        post.comments.push(newComment)
        await post.save()

        req.io.emit('comment:created', post)
        return res.status(200).json(post)
    },
    async update(req, res){
        let post = await Post.findById(req.params.id)
        post.comments = post.comments.map(comment =>{
            let findedComment = req.body.find(editedComment => 
                                                editedComment.id.toString() === comment._id.toString())           
            
            if (findedComment) {
                comment.comment = setValueByProp(comment,findedComment,'comment') 
                comment.likes = setValueByProp(comment,findedComment,'likes') 
            }
            return comment
        })

        await post.save()
        req.io.emit('comment:edited', post)
        return res.status(200).json(post)
    },
    async delete(req, res){
        let post = await Post.findById(req.params.id)
        post.comments = post.comments.filter(comment => 
            !(req.params.idComment.toString() === comment._id.toString())           
        )

        await post.save()
        req.io.emit('comment:deleted', post)
        return res.status(200).json(post)
    },
    async updateLike(req, res){
        let post = await Post.findById(req.params.id)
        post.comments = post.comments.map(comment =>{
            let findedComment = comment._id.toString() === req.params.idComment.toString()           

            if (findedComment) {
                comment.likes = comment.likes + 1
            }
            return comment
        })

        await post.save()
        req.io.emit('comment:edited', post)
        return res.status(200).json(post)
    }
}