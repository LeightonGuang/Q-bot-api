import { Router } from "express";
const accountRouter: Router = Router();
import {
  getAllUsers,
  getAllAccountsByDiscordId,
  getRiotAccountsByDiscordId,
  getSteamAccountsByDiscordId,
} from "../controllers/account-controller";

accountRouter.route("/").get(getAllUsers);
// accountRouter.route("/:id").get(getUserByDiscordId);
accountRouter.route("/:discord_id").get(getAllAccountsByDiscordId);
// accountRouter.route("/riot/add/:discord_id").post(addRiotAccount);
// accountRouter.route("/steam/add/:discord_id").post(addSteamAccount);
// select sub command
accountRouter.route("/riot/get/:discord_id").get(getRiotAccountsByDiscordId);
// accountRouter.route("/riot/edit/:discord_id").put(editRiotAccount);
accountRouter.route("/steam/get/:discord_id").get(getSteamAccountsByDiscordId);
// accountRouter.route("/steam/edit/:discord_id").put(editSteamAccount);

export default accountRouter;
