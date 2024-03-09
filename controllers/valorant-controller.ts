const knex = require("knex");
const config = require("../knexfile.js");

const knexInstance = knex(config);

import { User } from "../types/User";
import { RiotAccount } from "../types/RiotAccount";
import { SteamAccount } from "../types/SteamAccount";
import { SteamOrRiotAccount } from "../types/SteamOrRiotAccount";

// for check rank
const getActiveRiotAccountByDiscordId = async (req: any, res: any) => {
  try {
    const data: RiotAccount[] = await knexInstance("riot_accounts").where({
      discord_id: req.params.discord_id,
      active: true,
    });
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(400).send("Error retrieving active riot accounts");
  }
};

const updateActiveRiotAccountRank = async (req: any, res: any) => {
  try {
    const { rank, discord_id }: { rank: number; discord_id: string } = req.body;
    await knexInstance("riot_accounts")
      .where({ discord_id: discord_id, active: true })
      .update({ rank: rank });
    res.status(200).send("Riot account rank updated");
  } catch (error) {
    console.error(error);
    res.status(400).send("Error updating riot accounts rank");
  }
};

export { getActiveRiotAccountByDiscordId, updateActiveRiotAccountRank };
