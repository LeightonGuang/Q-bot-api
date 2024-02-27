import express from "express";
import accountRouter from "./routes/account-routes.js";
import dotenv from "dotenv";
dotenv.config({ path: "../.env" });

const PORT: number | string = process.env.PORT || 5050;
const app: express.Application = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to Q-bot-api");
});

app.use("/api/users", accountRouter);

app.listen(PORT, () => {
  console.log(`running at http://localhost:${PORT}`);
});
