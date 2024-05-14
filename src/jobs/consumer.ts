import nodemailer from "nodemailer";
const { Worker } = require("bullmq");
const path = require("path");

require("dotenv").config({
  path: path.resolve(__dirname, "../../../.env"),
});

import { client } from "../modules/common/redisUtils";
import {
  assignLabelToMail,
  getMailFromMessageId,
  getRefreshToken,
  sendEmail,
} from "../modules/gmail/gmail.provider";
import {
  getLabelIdFromLabel,
  parseMailContent,
  replyMessageFromLabel,
} from "../modules/common/commonUtils";
import { analyzeTheLabelOfTheContent } from "../modules/common/geminiUtils";
import { ParsedMailContent, ReplyMailBodyAndSubject } from "../types";
import {
  getNewAccessToken,
  isValidToken,
  oAuthClient,
} from "../modules/gmail/googleAuthUtils";
import { OAuth2Client } from "google-auth-library";

const sendMailWorker = new Worker(
  "email-queue",
  async (job: any) => {
    try {
      let { fromEmailId, messageId, refreshToken } = job.data;

      const accessToken: string = await getNewAccessToken(refreshToken);

      const mailContent = await getMailFromMessageId(
        fromEmailId,
        messageId,
        accessToken
      );

      const parsedEmailContent: ParsedMailContent =
        parseMailContent(mailContent);

      const analyzedLabel = await analyzeTheLabelOfTheContent(
        parsedEmailContent.body
      );

      await assignLabelToMail(
        fromEmailId,
        messageId,
        accessToken,
        analyzedLabel
      );

      const constructedReply = replyMessageFromLabel(analyzedLabel);

      const inputForReplyMail: ReplyMailBodyAndSubject = {
        replyMailId: parsedEmailContent.replyMailId,
        replyMailSubject: constructedReply.replyMailSubject,
        replyMailBody: constructedReply.replyMailBody,
        senderMailId: fromEmailId,
      };

      await sendEmail(inputForReplyMail, refreshToken, accessToken);

      console.log(`Job ${job.id} has completed!`);
    } catch (error) {
      console.log(
        "Error during the execution of the job :" +
          job.id +
          " Error: ----" +
          error
      );
    }
  },
  {
    connection: client,
  }
);
