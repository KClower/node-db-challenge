/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries

  await knex('task_resources').insert([
    { task_id: 1, resource_id: 1 },
    { task_id: 2, resource_id: 5 },
    { task_id: 3, resource_id: 2 },
    { task_id: 4, resource_id: 3 },
    { task_id: 5, resource_id: 4 },
    { task_id: 6, resource_id: 5 },
  ]);
};
