/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = (knex) => {
  return knex.schema
    .createTable("users", (table) => {
      table.increments("id").primary();
      table.string("discord_id").notNullable();
      table.string("tag").notNullable();
    })

    .createTable("riot_accounts", (table) => {
      table.increments("id").primary();
      table.string("discord_id").notNullable();
      table.string("riot_id").notNullable();
      table.string("region").notNullable();
      table.string("rank").notNullable();
      table.boolean("active").notNullable();
    })

    .createTable("steam_accounts", (table) => {
      table.increments("id").primary();
      table.string("discord_id").notNullable();
      table.string("steam_id").notNullable();
      table.string("account_name").notNullable();
      table.integer("friend_code").notNullable();
      table.string("steam_profile_url").notNullable();
      table.boolean("active").notNullable();
    })

    .createTable("balance", (table) => {
      table.increments("id").primary();
      table.string("discord_id").notNullable();
      table.integer("balance").notNullable();
      table.dateTime("checkin_time").notNullable();
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = (knex) => {};
