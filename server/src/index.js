const express = require('express')
const mongoose = require('mongoose')


const app = express();

mongoose.connect('mongodb+srv://master:master123@marvelcluster-6d3ar.mongodb.net/test?retryWrites=true&w=majority', {
    useNewUrlParser: true
})

app.use(require('./routes'))

app.listen('3333')