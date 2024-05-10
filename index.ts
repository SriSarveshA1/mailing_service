import express from "express";
import dotenv from "dotenv";
import { gmailRouter } from "./src/modules/gmail/gmail.api";

dotenv.config();

const app = express();

app.use(express.json());

app.get("/gmail", gmailRouter);



const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log("listening on port " + port);
});
