const express = require('express');
const Tasks = require('./tasks-model.js');

const router = express.Router();

router.get('/', (req, res) => {
    Tasks.find(req.query)
        .then(tasks => {
            res.status(200).json(tasks)
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({ message: "The tasks information could not be retrieved" });
        });
})

router.get('/:id', (req, res, next) => {
    Tasks.findById(req.params.id)
        .then(task => {
            res.json(task)
        })
        .catch(error => {
            console.log(error)
            res.status(500).json({ Message: "Could not find task" })
        })
})

router.post('/', (req, res) => {
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


router.put('/:id', (req, res) => {
    const id = req.params.id;
    const changes = req.body;

    Tasks.update(id, changes)
        .then(count => {
            if (count) {
                return Tasks.findById(id);
            } else {
                res.status(404).json({ Message: "The task with the specified ID does not not exist." })
            }
        })
        .then(updatedTask => {
            if (updatedTask) {
                return res.status(200).json(updatedTask);
            }
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({ Message: "There was an error while updating the task." })
        })
})


router.delete('/:id', (req, res) => {
    Tasks.remove(req.params.id)
        .then(count => {
            res.json({ removed: count })
        })
})

module.exports = router