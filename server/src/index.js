const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const cors = require('cors')
const fs = require('fs')

const app = express();
const options = {
    key: fs.readFileSync('./file.pem'),
    cert: fs.readFileSync('./file.crt')
  };
const server = require('https').createServer(options, app)
const io = require('socket.io')(server)

mongoose.connect('mongodb+srv://master:master123@marvelcluster-6d3ar.mongodb.net/omni?retryWrites=true&w=majority', {
    useNewUrlParser: true
})

app.use((req, res, next) =>{
    req.io = io;
    
    next()
})

app.use(cors())
app.use('/files', express.static(path.resolve(__dirname,'..', 'uploads', 'resized')))
app.use(require('./routes'))

server.listen('3333')