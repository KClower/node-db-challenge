const db = require('../data/db-config.js');

module.exports = {
    find,
    insert,
    findById,
    //update,
    remove
};



function find() {
    return db('resources');
}

async function findById(id) {
    const resource = await db('resources')
        .select('*')
        .where({ id })
        .first();

    if (!resource) {
        return null
    }
    return resource
}

function insert(resource) {
    return db('resources')
        .insert(resource)
        .then(ids => ({ id: ids[0] }));
}

function remove(id) {
    return db('resources')
        .where({ id })
        .del()
}

