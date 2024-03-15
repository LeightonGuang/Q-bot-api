const knex = require("knex");
const config = require("../knexfile.js");

const knexInstance = knex(config);

import { User } from "../types/User";
import { RiotAccount } from "../types/RiotAccount";
import { SteamAccount } from "../types/SteamAccount";
import { SteamOrRiotAccount } from "../types/SteamOrRiotAccount";
import { Balance } from "../types/Balance";

const getAllUsers = async (_req: any, res: any) => {
  try {
    const data: User[] = await knexInstance("users").select("*");
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(400).send("Error getting all users");
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
    res.status(400).send("Error getting all accounts by ");
  }
};

const isRegisteredByDiscordId = async (req: any, res: any) => {
  try {
    const data: User[] = await knexInstance("users").where({
      discord_id: req.params.discord_id,
    });
    if (data.length > 0) {
      res.status(200).send(true);
    } else if (data.length === 0) {
      res.status(200).send(false);
    }
  } catch (error) {
    console.error(error);
    res.status(400).send("Error checking if user is registered");
  }
};

const checkUserDuplicateRiotId = async (req: any, res: any) => {
  try {
    const { discord_id, riot_id } = req.body;
    const data: RiotAccount[] = await knexInstance("riot_accounts").where({
      discord_id: discord_id,
      riot_id: riot_id,
    });

    if (data.length === 0) {
      // if not duplicate, return false
      res.status(200).send(false);
    } else if (data.length > 0) {
      // if duoplicate, return true
      res.status(200).send(true);
    }
  } catch (error) {
    console.error(error);
    res.status(400).send("Error checking duplicate user");
  }
};

const createUser = async (req: any, res: any) => {
  try {
    await knexInstance("users").insert(req.body);
    res.status(201).send("User created");
  } catch (error) {
    console.error(error);
    res.status(400).send("Error creating user");
  }
};

const addRiotAccount = async (req: any, res: any) => {
  try {
    await knexInstance("riot_accounts").insert(req.body);
    res.status(201).send("Riot account added");
  } catch (error) {
    console.error(error);
    res.status(400).send("Error adding riot account");
  }
};

const addSteamAccount = async (req: any, res: any) => {
  try {
    const {} = req.body;
    res.status(201).send("Steam account added");
  } catch (error) {
    console.error(error);
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

const selectRiotAccount = async (req: any, res: any) => {
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

const selectSteamAccount = async (req: any, res: any) => {
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

const deleteRiotAccount: any = async (req: any, res: any) => {
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
    res.status(400).send("Error deleting riot accounts");
  }
};

const deleteSteamAccount: any = async (req: any, res: any) => {};

const deleteAllAccountsByDiscordId: any = async (req: any, res: any) => {
  try {
    await knexInstance("riot_accounts")
      .where({ discord_id: req.params.discord_id })
      .del();

    await knexInstance("steam_accounts")
      .where({
        discord_id: req.params.discord_id,
      })
      .del();

    await knexInstance("users")
      .where({
        discord_id: req.params.discord_id,
      })
      .del();

    res.status(200).send("All Accounts Deleted");
  } catch (error) {
    console.error(error);
    res.status(400).send("Error deleting Riot Accounts");
  }
};

const getAccountBalanceByDiscordId: any = async (req: any, res: any) => {
  try {
    const data: Balance[] = await knexInstance("balance").where({
      discord_id: req.params.discord_id,
    });
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
  }
};

const editAccountBalance: any = async (req: any, res: any) => {
  try {
    const { discord_id, balance } = req.body;

    const oldBalance: Balance[] = await knexInstance("balance").where({
      discord_id: discord_id,
    });
    console.log(oldBalance);

    if (balance.includes("+")) {
      const updatedBalance: number =
        Number(oldBalance[0].balance) + Number(balance.replace("+", ""));

      await knexInstance("balance").where({ discord_id: discord_id }).update({
        balance: updatedBalance,
      });

      res.status(201).send("Balance added");
    } else if (balance.includes("-")) {
      const updatedBalance: number =
        Number(oldBalance[0].balance) - Number(balance.replace("-", ""));

      await knexInstance("balance").where({ discord_id: discord_id }).update({
        balance: updatedBalance,
      });

      res.status(201).send("Balance deducted");
    }
  } catch (error) {
    console.error(error);
    res.status(400).send("Error adding balance");
  }
};

export {
  getAllUsers,
  getAllAccountsByDiscordId,
  isRegisteredByDiscordId,
  checkUserDuplicateRiotId,
  createUser,
  addRiotAccount,
  addSteamAccount,
  getRiotAccountsByDiscordId,
  selectRiotAccount,
  getSteamAccountsByDiscordId,
  selectSteamAccount,
  deleteRiotAccount,
  deleteSteamAccount,
  deleteAllAccountsByDiscordId,
  getAccountBalanceByDiscordId,
  editAccountBalance,
};
