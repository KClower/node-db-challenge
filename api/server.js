const express = require('express');
const projectRouter = require('./projects-router')


const server = express();

server.use(express.json());
server.use('/api', projectRouter)

server.get('/', (req, res) => {
    res.send(`<h2>Welcome to the Node Database Challenge</h2>`)
})


module.exports = server;