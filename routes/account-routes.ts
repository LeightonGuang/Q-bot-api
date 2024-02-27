import { Router } from "express";
const accountRouter: Router = Router();
import {
  getAllUsers,
  getUserByDiscordId,
} from "../controllers/account-controller";

accountRouter.route("/").get(getAllUsers);
accountRouter.route("/:id").get(getUserByDiscordId);

export default accountRouter;
