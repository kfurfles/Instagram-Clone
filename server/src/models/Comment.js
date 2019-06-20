const { Schema, model } = require('mongoose')

module.exports = new Schema({
    comment: String,
    likes:{
        type: Number,
        default: 0
    },
},
{
    timestamps: true
})

// module.exports = model('Comment', CommentSchema)