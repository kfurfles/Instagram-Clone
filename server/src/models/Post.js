const { Schema, model } = require('mongoose')
const CommentSchema = require('./Comment')
const PostSchema = new Schema({
    author: String,
    place: String,
    description: String,
    hashtags: String,
    image: String,
    likes:{
        type: Number,
        default: 0
    },
    comments:[CommentSchema]
},
{
    timestamps: true
})

module.exports = model('Post', PostSchema)