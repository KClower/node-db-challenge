const db = require('../data/db-config.js');


module.exports = {
    find,
    insert,
    findById,
    update,
    remove
};





function find() {
    return db('tasks')

        .join('projects', 'tasks.project_id', 'projects.id')
        .select('projects.name', 'projects.desc', 'tasks.*');
}

async function findById(id) {
    const task = await db('tasks')
        .select('*')
        .where({ id })
        .first();

    if (!task) {
        return null
    }
    return task
}

function update(id, changes) {
    return db('tasks')
        .where({ id })
        .update(changes)
        .then(() => {
            return findById(id)
        });

}


function insert(task) {
    return db('tasks')
        .insert(task)
        .then(ids => ({ id: ids[0] }));

}

function remove(id) {
    return db('tasks')
        .where({ id })
        .del()
}
