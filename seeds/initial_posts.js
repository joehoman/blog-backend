/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('posts').del()
  await knex('posts').insert([
    {title: 'First Post', content:'This blog was the first full stack app I deployed!', created_by:'Joe'},
    {title: 'How are these posts here?', content:'These posts were seeded by KNEX. Every time the backend server reboots, the table that contains these posts is created, and this data is seeded.', created_by:'Joe'},
    {title: 'Registering an Account', content:'If you register, you can make posts. You can also edit and delete your posts. They will be deleted when the server goes to sleep and reboots.', created_by:'Joe'},
    {title: 'Project', content:'This was my first project, and I was on a strict timeline. I was required to build a full stack CRUD app with the functionality to create, edit, and delete posts.', created_by:'Joe'},
    {title: 'Changes', content:'If I were to put more time into this application, I would improve the styling, and make the UI more friendly.', created_by:'Joe'}
  ]);
};
