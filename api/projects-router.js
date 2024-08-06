const express = require('express');
const Projects = require('./projects-model.js');
const Tasks = require('./tasks-model.js');
const Resources = require('./resources-model.js');

const router = express.Router();



router.get('/projects', (req, res) => {
    Projects.find(req.query)
        .then(projects => {
            res.status(200).json(projects)
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({ message: "The project information could not be retrieved" });
        });
})

router.get('/projects/:id', (req, res, next) => {
    Projects.findById(req.params.id)
        .then(project => {
            res.json(project)
        })
        .catch(error => {
            console.log(error)
            res.status(500).json({ Message: "Could not find project" })
        })
})


router.post('/projects', (req, res) => {
    const newProject = req.body;
    if (!newProject.name) {
        return res.status(400).json({ Message: "Please give project a name" });
    }
    Projects.insert(newProject)

        .then(createdProject => {
            res.status(201).json({ Message: "Created project successfully", project: createdProject });
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({ message: "There was an error while saving the project to the database" });
        });
})

// router.put('/projects/:id', (req, res) => {
//     const { id } = req.params.id;
//     const changes = req.body;

//     Projects.update(id, changes)
//         .then(count => {
//             if (count) {
//                 return Projects.findById(id);
//             } else {
//                 res.status(404).json({ Message: "The project with the specified ID does not not exist." })
//             }
//         })
//         .then(updatedProject => {
//             if (updatedProject) {
//                 res.status(200).json(updatedProject);
//             }
//         })
//         .catch(error => {
//             console.log(error);
//             res.status(500).json({ Message: "There was an error while updating the project." })
//         })
// })

router.delete('/projects/:id', (req, res) => {
    Projects.remove(req.params.id)
        .then(count => {
            res.json({ removed: count })
        })
})



router.get('/resources', (req, res) => {
    Resources.find(req.query)
        .then(resources => {
            res.status(200).json(resources)
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({ message: "The resources information could not be retrieved" });
        });
})

router.get('/resources/:id', (req, res, next) => {
    Resources.findById(req.params.id)
        .then(resource => {
            res.json(resource)
        })
        .catch(error => {
            console.log(error)
            res.status(500).json({ Message: "Could not find resource" })
        })
})

router.post('/resources', (req, res) => {
    const newResource = req.body;
    if (!newResource.name) {
        return res.status(400).json({ Message: "Please give resource a name" });
    }
    Resources.insert(newResource)
        .then(createdResource => {
            res.status(201).json({ Message: "Created resource successfully", createdResource });
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({ message: "There was an error while saving the resource to the database" });
        });
})

router.delete('/resources/:id', (req, res) => {
    Resources.remove(req.params.id)
        .then(count => {
            res.json({ removed: count })
        })
})



router.get('/tasks', (req, res) => {
    Tasks.find(req.query)
        .then(tasks => {
            res.status(200).json(tasks)
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({ message: "The tasks information could not be retrieved" });
        });
})

router.get('/tasks/:id', (req, res, next) => {
    Tasks.findById(req.params.id)
        .then(task => {
            res.json(task)
        })
        .catch(error => {
            console.log(error)
            res.status(500).json({ Message: "Could not find task" })
        })
})

router.post('/tasks', (req, res) => {
    const newTask = req.body;
    if (!newTask.desc || !newTask.project_id) {
        return res.status(400).json({ Message: "Please give the task a description and the id of the project_id it goes to" });
    }
    Tasks.insert(newTask)
        .then(createdTask => {
            res.status(201).json({ Message: "Created task successfully", tsak: createdTask });
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({ message: "There was an error while saving the task to the database" });
        });
})


router.delete('/tasks/:id', (req, res) => {
    Tasks.remove(req.params.id)
        .then(count => {
            res.json({ removed: count })
        })
})


module.exports = router