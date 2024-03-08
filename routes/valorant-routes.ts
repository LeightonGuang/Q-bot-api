import { Router } from "express";
const valorantRouter: Router = Router();

import {
  getActiveRiotAccountByDiscordId,
  updateActiveRiotAccountRank,
} from "../controllers/valorant-controller";

valorantRouter
  .route("/active/get/:discord_id")
  .get(getActiveRiotAccountByDiscordId);

valorantRouter.route("/active/update").patch(updateActiveRiotAccountRank);

export default valorantRouter;
