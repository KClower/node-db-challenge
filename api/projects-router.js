const express = require('express');
const Projects = require('./projects-model.js');



const router = express.Router();



router.get('/', (req, res) => {
    Projects.find(req.query)
        .then(projects => {
            res.status(200).json(projects)
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({ message: "The project information could not be retrieved" });
        });
})

router.get('/:id', (req, res, next) => {
    Projects.findById(req.params.id)
        .then(project => {
            res.json(project)
        })
        .catch(error => {
            console.log(error)
            res.status(500).json({ Message: "Could not find project" })
        })
})


router.post('/', (req, res) => {
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

router.put('/:id', (req, res) => {
    const id = req.params.id;
    const changes = req.body;

    Projects.update(id, changes)
        .then(count => {
            if (count) {
                return Projects.findById(id);
            } else {
                res.status(404).json({ Message: "The project with the specified ID does not not exist." })
            }
        })
        .then(updatedProject => {
            if (updatedProject) {
                return res.status(200).json(updatedProject);
            }
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({ Message: "There was an error while updating the project." })
        })
})

router.delete('/:id', (req, res) => {
    Projects.remove(req.params.id)
        .then(count => {
            res.json({ removed: count })
        })
})










module.exports = router