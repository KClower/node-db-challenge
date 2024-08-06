/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('task_resources').truncate()
  await knex('tasks').truncate()
  await knex('projects').truncate()
  await knex('resources').truncate()

};
