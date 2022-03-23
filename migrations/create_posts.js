/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable("posts", (table) => {
        table.increments("id");
        // table.foreign("fk_userid").references(id).inTable(users)
        table.string("title");
        table.string("content");
        table.timestamp('created_at').notNullable().index().defaultTo(knex.raw('now()'));
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {

};
