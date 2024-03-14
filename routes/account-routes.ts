import { Router } from "express";
const accountRouter: Router = Router();
import {
  getAllUsers,
  isRegisteredByDiscordId,
  getAllAccountsByDiscordId,
  createUser,
  checkUserDuplicateRiotId,
  addRiotAccount,
  addSteamAccount,
  getRiotAccountsByDiscordId,
  selectRiotAccount,
  getSteamAccountsByDiscordId,
  selectSteamAccount,
  deleteAllAccountsByDiscordId,
  deleteRiotAccount,
  deleteSteamAccount,
  getAccountBalanceByDiscordId,
} from "../controllers/account-controller";

accountRouter.route("/").get(getAllUsers);
accountRouter.route("/registered/:discord_id").get(isRegisteredByDiscordId);

// add sub command
accountRouter.route("/:discord_id").get(getAllAccountsByDiscordId);
accountRouter.route("/").post(createUser);
accountRouter.route("/riot/is_duplicate").get(checkUserDuplicateRiotId);
accountRouter.route("/riot/add").post(addRiotAccount);
accountRouter.route("/steam/add").post(addSteamAccount);

// select sub command
accountRouter.route("/riot/get/:discord_id").get(getRiotAccountsByDiscordId);
accountRouter.route("/riot/select").patch(selectRiotAccount);
accountRouter.route("/steam/get/:discord_id").get(getSteamAccountsByDiscordId);
accountRouter.route("/steam/select").patch(selectSteamAccount);

// delete sub command
accountRouter.route("/delete/:discord_id").delete(deleteAllAccountsByDiscordId);
accountRouter.route("/riot/delete").delete(deleteRiotAccount);
accountRouter.route("/steam/delete").delete(deleteSteamAccount);

// balance sub command
accountRouter
  .route("/balance/get/:discord_id")
  .get(getAccountBalanceByDiscordId);

export default accountRouter;
