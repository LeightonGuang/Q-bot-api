const users = require("../seed-data/accounts.js/index.js");
const riot_accounts = require("../seed-data/riot_accounts.js");

exports.seed = async (knex) => {
  await knex("users").del();
  await knex("users").insert(users);

  await knex("riot_accounts").del();
  await knex("riot_accounts").insert(riot_accounts);

  // await knex("steam_accounts").del();
};
