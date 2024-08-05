const express = require('express');
const Projects = require('../api/projects-model.js');

const router = express.Router();

// - [ ] when adding a `task` the client must provide a description, 
//   the notes are optional.

// - [ ] when adding a `task` the client must provide the 
//   `id` of an existing project.

// - [ ] for `projects` and `tasks` if no value is provided
//   for the `completed` property, the API should provide a 
//   default value of `false`.

router.get('/projects', (req, res) => {
    Projects.findProjects(req.query)
        .then(projects => {
            res.status(200).json(projects)
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({ message: "The project information could not be retrieved" });
        });
})

router.post('/projects', (req, res) => {
    const newProject = req.body;
    if (!newProject.name) {
        return res.status(400).json({ Message: "Please give project a name" });
    }
    Projects.insertProject(newProject)
        .then(createdProject => {
            res.status(201).json({ Message: "Created project successfully", createdProject });
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({ message: "There was an error while saving the project to the database" });
        });
})




router.get('/tasks', (req, res) => {
    Projects.findTasks(req.query)
        .then(tasks => {
            res.status(200).json(tasks)
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({ message: "The tasks information could not be retrieved" });
        });
})




router.get('/resources', (req, res) => {
    Projects.findResources(req.query)
        .then(resources => {
            res.status(200).json(resources)
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({ message: "The resources information could not be retrieved" });
        });
})

router.post('/resources', (req, res) => {
    const newResource = req.body;
    if (!newResource.name) {
        return res.status(400).json({ Message: "Please give resource a name" });
    }
    Projects.insertResource(newResource)
        .then(createdResource => {
            res.status(201).json({ Message: "Created resource successfully", createdResource });
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({ message: "There was an error while saving the resource to the database" });
        });
})

module.exports = router