import nodemailer from "nodemailer";
const { Worker } = require("bullmq");

import { client } from "../modules/common/redisUtils";
import {
  assignLabelToMail,
  getMailFromMessageId,
} from "../modules/gmail/gmail.provider";
import {
  getLabelIdFromLabel,
  parseMailContent,
  replyMessageFromLabel,
} from "../modules/common/commonUtils";
import { analyzeTheLabelOfTheContent } from "../modules/common/geminiUtils";
import { ParsedMailContent, ReplyMailBodyAndSubject } from "../types";

// 1. get the content of the mail of specified messageId
// 2. parse the content of the mail
// 3. Generate the label based on the content of the mail
// 4. Assign the label to the given messageId
// 5. Generate the response from the content of the mail
// 6. Send the mail to the specified replyMailId with the generated message
// 7. Send the mail to the developer if any job is failed

const sendMailWorker = new Worker(
  "email-queue",
  async (job: any) => {
    let { fromEmailId, messageId, accessToken } = job.data;

    const mailContent = await getMailFromMessageId(
      fromEmailId,
      messageId,
      accessToken
    );

    const parsedEmailContent: ParsedMailContent = parseMailContent(mailContent);

    const analyzedLabel = await analyzeTheLabelOfTheContent(
      parsedEmailContent.body
    );

    await assignLabelToMail(fromEmailId, messageId, accessToken, analyzedLabel);
    
    const constructedReply = replyMessageFromLabel(analyzedLabel);

    const inputForReplyMail:ReplyMailBodyAndSubject = {
      replyMailId:parsedEmailContent.replyMailId,
      replyMailSubject: constructedReply.replyMailSubject,
      replyMailBody: constructedReply.replyMailBody,
      senderMailId:fromEmailId,
    }




    
  },
  {
    connection: client,
  }
);
