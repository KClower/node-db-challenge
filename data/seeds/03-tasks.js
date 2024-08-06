/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries

  await knex('tasks').insert([
    { project_id: 1, desc: 'Invite friends', notes: 'Only good ones' },
    { project_id: 1, desc: 'Send address', notes: 'Using GPS' },
    { project_id: 1, desc: 'Lay out games', notes: 'Games to choose from' },
    { project_id: 2, desc: 'Grab fishing pole', notes: 'In the garage' },
    { project_id: 2, desc: 'Grab tackle', notes: 'Next to fishing pole' },
    { project_id: 2, desc: 'Locate fishing spot', notes: 'Using GPS' },

  ]);
};
