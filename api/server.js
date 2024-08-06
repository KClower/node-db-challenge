const express = require('express');
const projectRouter = require('./projects-router');
const taskRouter = require('./tasks-router');
const resourceRouter = require('./resources-router');


const server = express();

server.use(express.json());
server.use('/api/projects', projectRouter)
server.use('/api/tasks', taskRouter)
server.use('/api/resources', resourceRouter)

server.get('/', (req, res) => {
    res.send(`<h2>Welcome to the Node Database Challenge</h2>`)
})


module.exports = server;