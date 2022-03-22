/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('users').del()
  await knex('users').insert([
    {first_name: 'Joe', last_name: 'Homan', username: 'jmhoman332', passwordHash: 'test'},
    {first_name: 'asdf', last_name: 'asdf', username: 'asdf', passwordHash: 'asdf'},
  ]);
};
