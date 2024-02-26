import users from "../seed-data/users.js";

export const seed = async (knex) => {
  await knex("users").del();
  await knex("users").insert(users);
};
