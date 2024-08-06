/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries

  await knex('projects').insert([
    { name: 'Game Night', desc: 'Haveing fun with friends' },
    { name: 'Go Fishing', desc: 'Bass fishing' },
  ]);
};
