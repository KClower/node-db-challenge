/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema
        .createTable('projects', tbl => {
            tbl.increments();
            tbl.string('name')
                .unique()
                .notNullable()
            tbl.string('desc').defaultTo("")
            tbl.boolean('completed').defaultTo(false)
                .notNullable();
        })
        .createTable('resources', tbl => {
            tbl.increments();
            tbl.string('name')
                .notNullable();
            tbl.string('desc').defaultTo("")
        })
        .createTable('tasks', tbl => {
            tbl.increments();
            tbl.string('desc')
                .notNullable()
            tbl.string('notes').defaultTo("")
            tbl.integer('project_id')
                .unsigned()
                .notNullable()
                .references('id')
                .inTable('projects')
            tbl.boolean('completed').defaultTo(false)
                .notNullable();
        })
        .createTable('task_resources', tbl => {
            tbl.increments();
            tbl.integer('task_id')
                .unsigned()
                .notNullable()
                .references('id')
                .inTable('tasks');

            tbl.integer('resource_id')
                .unsigned()
                .notNullable()
                .references('id')
                .inTable('resources');
        })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema
        .dropTableIfExists('task_resources')
        .dropTableIfExists('tasks')
        .dropTableIfExists('resources')
        .dropTableIfExists('projects')
};
