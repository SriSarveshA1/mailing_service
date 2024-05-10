import express from "express";

const path = require("path");

require("dotenv").config({
  path: path.resolve(__dirname, "../.env"),
});
import { gmailRouter } from "./src/modules/gmail/gmail.api";

const app = express();

app.use(express.json());

app.use("/google", gmailRouter);



const port = process.env.PORT;
app.listen(port, () => {
  console.log("listening on  " + port);
});
