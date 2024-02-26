import { Router } from "express";
const userRouter: Router = Router();
import {
  getAllUsers,
  getUserByDiscordId,
} from "../controllers/user-controller.js";

userRouter.route("/").get(getAllUsers);
userRouter.route("/:id").get(getUserByDiscordId);

export default userRouter;
