import { Router } from "express";
const valorantRouter: Router = Router();

import { getActiveRiotAccountByDiscordId } from "../controllers/valorant-controller";

valorantRouter
  .route("/active/get/:discord_id")
  .get(getActiveRiotAccountByDiscordId);

export default valorantRouter;
