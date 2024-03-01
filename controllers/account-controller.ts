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
    const data: RiotAccount[] = await knexInstance("riot_accounts")
      .select("*")
      .where({
        discord_id: req.params.discord_id,
      });
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(400).send("Error retrieving riot accounts");
  }
};

const selectRiotAccountByRiotId = async (req: any, res: any) => {
  try {
    const { discord_id, selectedAccountIdOrName } = req.body;

    // turn all other accounts to inactive
    await knexInstance("riot_accounts")
      .where({
        discord_id: discord_id,
      })
      .update({ active: false });

    // set selected account to active
    await knexInstance("riot_accounts")
      .where({
        riot_id: selectedAccountIdOrName,
      })
      .update({ active: true });
    res.status(200).send("success");
  } catch (error) {
    console.error(error);
  }
};

const getSteamAccountsByDiscordId = async (req: any, res: any) => {
  try {
    const data: SteamAccount[] = await knexInstance("steam_accounts")
      .select("*")
      .where({
        discord_id: req.params.discord_id,
      });
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(400).send("Error retrieving steam accounts");
  }
};

export {
  getAllUsers,
  getAllAccountsByDiscordId,
  getRiotAccountsByDiscordId,
  selectRiotAccountByRiotId,
  getSteamAccountsByDiscordId,
};
