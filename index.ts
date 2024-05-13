import express from "express";

const path = require("path");

require("dotenv").config({
  path: path.resolve(__dirname, "../.env"),
});
import { gmailRouter } from "./src/modules/gmail/gmail.api";
import { checkJobs } from "./src/jobs/producer";

const app = express();

app.use(express.json());

app.use("/gmail", gmailRouter);
app.get("/status/jobs", async (req: any, res) => {
  const status = req.query.status || "waiting";
  const jobStatusArray = await checkJobs(status);
  return res.send(jobStatusArray);
});

app.use((req, res) => {
  return res.status(400).send("Please hit a valid endpoint");
});

const port = process.env.PORT;
app.listen(port, () => {
  console.log("listening on  " + port);
});
