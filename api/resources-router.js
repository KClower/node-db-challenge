const express = require('express');
const Resources = require('./resources-model.js')

const router = express.Router();

router.get('/', (req, res) => {
    Resources.find(req.query)
        .then(resources => {
            res.status(200).json(resources)
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({ message: "The resources information could not be retrieved" });
        });
})

router.get('/:id', (req, res, next) => {
    Resources.findById(req.params.id)
        .then(resource => {
            res.json(resource)
        })
        .catch(error => {
            console.log(error)
            res.status(500).json({ Message: "Could not find resource" })
        })
})

router.post('/', (req, res) => {
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

router.put('/:id', (req, res) => {
    const id = req.params.id;
    const changes = req.body;

    Resources.update(id, changes)
        .then(count => {
            if (count) {
                return Resources.findById(id);
            } else {
                res.status(404).json({ Message: "The resource with the specified ID does not not exist." })
            }
        })
        .then(updatedResource => {
            if (updatedResource) {
                return res.status(200).json(updatedResource);
            }
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({ Message: "There was an error while updating the resoiurce." })
        })
})



router.delete('/:id', (req, res) => {
    Resources.remove(req.params.id)
        .then(count => {
            res.json({ removed: count })
        })
})

module.exports = router;