import { Router } from "express";
const accountRouter: Router = Router();
import {
  getAllUsers,
  getAllAccountsByDiscordId,
  addRiotAccount,
  addSteamAccount,
  getRiotAccountsByDiscordId,
  selectRiotAccount,
  getSteamAccountsByDiscordId,
  selectSteamAccount,
  deleteRiotAccount,
  deleteSteamAccount,
} from "../controllers/account-controller";

accountRouter.route("/").get(getAllUsers);
// accountRouter.route("/:id").get(getUserByDiscordId);
accountRouter.route("/:discord_id").get(getAllAccountsByDiscordId);
accountRouter.route("/riot/add").post(addRiotAccount);
accountRouter.route("/steam/add").post(addSteamAccount);
// select sub command
accountRouter.route("/riot/get/:discord_id").get(getRiotAccountsByDiscordId);
accountRouter.route("/riot/select").patch(selectRiotAccount);
accountRouter.route("/steam/get/:discord_id").get(getSteamAccountsByDiscordId);
accountRouter.route("/steam/select").patch(selectSteamAccount);

// delete sub command
accountRouter.route("/riot/delete").delete(deleteRiotAccount);
accountRouter.route("/steam/delete").delete(deleteSteamAccount);

export default accountRouter;
