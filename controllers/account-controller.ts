const knex = require("knex");
const config = require("../knexfile.js");

const knexInstance = knex(config);

import { User } from "../types/User";
import { RiotAccount } from "../types/RiotAccount";
import { SteamAccount } from "../types/SteamAccount";
import { SteamOrRiotAccount } from "../types/SteamOrRiotAccount";

const getAllUsers = async (_req: any, res: any) => {
  try {
    const data: User[] = await knexInstance("users").select("*");
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(400).send("Error retrieving users");
  }
};

const getAllAccountsByDiscordId = async (req: any, res: any) => {
  try {
    const riotAccounts: SteamOrRiotAccount[] = await knexInstance(
      "riot_accounts"
    )
      .select("*")
      .where({
        discord_id: req.params.discord_id,
      });

    const steamAccounts: SteamOrRiotAccount[] = await knexInstance(
      "steam_accounts"
    )
      .select("*")
      .where({
        discord_id: req.params.discord_id,
      });
    res
      .status(200)
      .json({ riotAccountList: riotAccounts, steamAccountList: steamAccounts });
  } catch (error) {
    console.error(error);
    res.status(400).send("Error retrieving user");
  }
};

// for select sub command
const getRiotAccountsByDiscordId = async (req: any, res: any) => {
  try {
    const data: RiotAccount[] = await knexInstance("riot_accounts").where({
      discord_id: req.params.id,
    });
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(400).send("Error retrieving riot accounts");
  }
};

const selectRiotAccoutsByDiscordId = async (req: any, res: any) => {
  try {
  } catch (error) {
    console.error(error);
    res.status(400).send("Error selecting riot account");
  }
};

export {
  getAllUsers,
  getAllAccountsByDiscordId,
  getRiotAccountsByDiscordId,
  selectRiotAccoutsByDiscordId,
};
