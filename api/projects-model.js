const db = require('../data/db-config.js');

module.exports = {
    findProjects,
    insertProject,
    findTasks,
    // insertTask,
    findResources,
    insertResource,
};



function findProjects() {
    return db('projects');
}

function insertProject(project) {
    return db('projects')
        .insert(project)
        .then(ids => ({ id: ids[0] }));
}





function findTasks() {
    return db('tasks');
}





function findResources() {
    return db('resources');
}

function insertResource(resource) {
    return db('resources')
        .insert(resource)
        .then(ids => ({ id: ids[0] }));
}