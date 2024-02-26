import express from "express";
const app: express.Application = express();
import dotenv from "dotenv";
dotenv.config({ path: "../.env" });

const PORT: number | string = process.env.PORT || 5050;

app.get("/", (req, res) => {
  res.send("Welcome to Q-bot-api");
});

app.listen(PORT, () => {
  console.log(`running at http://localhost:${PORT}`);
});
