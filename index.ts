import express from "express";
import userRouter from "./routes/user-routes.js";
import dotenv from "dotenv";
dotenv.config({ path: "../.env" });

const PORT: number | string = process.env.PORT || 5050;
const app: express.Application = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to Q-bot-api");
});

app.use("/api/users", userRouter);

app.listen(PORT, () => {
  console.log(`running at http://localhost:${PORT}`);
});
