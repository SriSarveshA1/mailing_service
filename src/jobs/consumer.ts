import nodemailer from "nodemailer";
const { Worker } = require("bullmq");

import { client } from "../modules/common/redisUtils";

// 1. get the content of the mail of specified messageId
// 2. parse the content of the mail
// 3. Generate the label based on the content of the mail
// 4. Assign the label to the given messageId
// 5. Generate the response from the content of the mail
// 6. Send the mail to the specified toEmailId with the generated message

const sendMailWorker = new Worker(
  "email-queue",
  async (job: any) => {
    let { toEmailId, mailContent, messageId } = job.data;
  },
  {
    connection: client,
  }
);
