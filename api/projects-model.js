const db = require('../data/db-config.js');

module.exports = {
    find,
    insert,
    findById,
    update,
    remove
};



function find() {
    return db('projects')
}

async function findById(id) {
    const project = await db('projects')
        .select('*')
        .where({ id })
        .first();

    if (!project) {
        return null
    }
    return project
}

function update(id, changes) {
    return db('projects')
        .where({ id })
        .update(changes)
        .then(() => {
            return findById(id)
        });

}

function insert(project) {
    return db('projects')
        .insert(project)
        .then(ids => ({ id: ids[0] }));
}

function remove(id) {
    return db('Projects')
        .where({ id })
        .del()
}








