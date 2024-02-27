const users = require("../seed-data/accounts.js");
const riot_accounts = require("../seed-data/riot_accounts");
const steam_accounts = require("../seed-data/steam_accounts");

exports.seed = async (knex) => {
  await knex("users").del();
  await knex("users").insert(users);

  await knex("riot_accounts").del();
  await knex("riot_accounts").insert(riot_accounts);

  await knex("steam_accounts").del();
  await knex("steam_accounts").insert(steam_accounts);
};
