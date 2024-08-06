/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries

  await knex('resources').insert([
    { name: 'Contacts List', desc: 'List of friends numbers' },
    { name: 'Board Games', desc: 'Games to play' },
    { name: 'Fishing Pole', desc: 'Shakespeare power series' },
    { name: 'Tackle Box', desc: 'Collection of lures' },
    { name: 'GPS', desc: 'Global Positioning System' },
  ]);
};
