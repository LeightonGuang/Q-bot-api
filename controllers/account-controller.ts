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
    const { discord_id, riot_id } = req.body;

    // turn all other accounts to inactive
    await knexInstance("riot_accounts")
      .where({
        discord_id: discord_id,
      })
      .update({ active: false });

    // set selected account to active
    await knexInstance("riot_accounts")
      .where({
        riot_id: riot_id,
      })
      .update({ active: true });
    res.status(200).send("Riot account selected");
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

const selectSteamAccountBySteamId = async (req: any, res: any) => {
  try {
    const { discord_id, steam_id } = req.body;

    await knexInstance("steam_accounts")
      .where({
        discord_id: discord_id,
      })
      .update({ active: false });

    await knexInstance("steam_accounts")
      .where({
        steam_id: steam_id,
      })
      .update({ active: true });

    const data: SteamAccount[] = await knexInstance("steam_accounts").where({
      steam_id: steam_id,
    });
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
  }
};

const deleteRiotAccountByRiotId = async (req: any, res: any) => {
  try {
    const { discord_id, riot_id } = req.body;

    // delete the account
    await knexInstance("riot_accounts")
      .where({
        riot_id: riot_id,
      })
      .del();

    // turn all other accounts to inactive
    const noAccountActive: boolean =
      (await knexInstance("riot_accounts")
        .where({
          discord_id: discord_id,
        })
        .whereNot({ active: false }).length) === 0;

    const userHasNoRiotAccount: boolean =
      (await knexInstance("riot_accounts").where({
        discord_id: discord_id,
      }).length) === 0;

    if (userHasNoRiotAccount && noAccountActive) {
      // set the first account to active
      await knexInstance("riot_accounts")
        .where({
          discord_id: discord_id,
        })
        .first()
        .update({ active: true });
    }

    res.status(200).send("Riot account deleted");
  } catch (error) {
    console.error(error);
  }
};

const deleteSteamAccountBySteamId = async (req: any, res: any) => {};

export {
  getAllUsers,
  getAllAccountsByDiscordId,
  getRiotAccountsByDiscordId,
  selectRiotAccountByRiotId,
  getSteamAccountsByDiscordId,
  selectSteamAccountBySteamId,
  deleteRiotAccountByRiotId,
  deleteSteamAccountBySteamId,
};
