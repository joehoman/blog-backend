/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('users').del()
  await knex('users').insert([
    {first_name: 'James', last_name: 'Kelley', username: 'tankjutsu', password_hash: '$2a$12$RkLdUj2w2gyyZAqKa54wSuLBrieKPPa/jClEbQiaQr.tBLK.v.u/C'},
    {first_name: 'Joe', last_name: 'Homan', username: 'Joe', password_hash: '$2a$12$RkLdUj2w2gyyZAqKa54wSuLBrieKPPa/jClEbQiaQr.tBLK.v.u/C'},
    //password is test
  ]);
};
