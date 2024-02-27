import knex from "knex";
import config from "../knexfile.js";

const knexInstance = knex(config);

type User = {
  id: number;
  discord_id: string;
  tag: string;
};

const getAllUsers = async (_req: any, res: any) => {
  try {
    const data: User[] = await knexInstance("users").select("*");
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(400).send("Error retrieving users");
  }
};
const getUserByDiscordId = async (req: any, res: any) => {
  try {
    const data: User[] = await knexInstance("users").where({
      discord_id: req.params.id,
    });
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(400).send("Error retrieving user");
  }
};

export { getAllUsers, getUserByDiscordId };
