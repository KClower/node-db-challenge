const db = require('../data/db-config.js');


module.exports = {
    find,
    insert,
    findById,
    //update,
    remove
};





function find() {
    return db('tasks')

        .join('projects', 'tasks.project_id', 'projects.id')
        .select('projects.name', 'projects.desc', 'tasks.*');
}

async function findById(id) {
    const task = await db('tasks')
        // .select('*')
        .where({ id })
        .first();


}

// function insert(task) {
//     return db('tasks')
//         .insert(task)
//         .then(([id]) => {
//             return findById(id)

//         })
// }

function insert(task) {
    return db('tasks')
        .insert(task)
        .then(ids => {
            const id = ids[0];
            return findById(id);
        });
}

function remove(id) {
    return db('tasks')
        .where({ id })
        .del()
}
