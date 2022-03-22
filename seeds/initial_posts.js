/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('posts').del()
  await knex('posts').insert([
    {title: 'ExampleBlogPost', content:'This is a blog Post!'},
    {title: 'ExampleBlogPost2', content:'This is a blog Post2!'},
    {title: 'ExampleBlogPost3', content:'This is a blog Post3!'}

  ]);
};
