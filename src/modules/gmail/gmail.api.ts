import express from "express";
import { OAuth2Client } from "google-auth-library";
import nodemailer from "nodemailer";
import {
  authenticateUser,
  getMails,
  getSpecificMail,
  returnRedirectAuthUrl,
} from "./gmail.provider";
require("dotenv").config();

export const gmailRouter = express.Router();

gmailRouter.get("/gmail/auth", async (req, res) => {
  try {
    const authUrl = returnRedirectAuthUrl();
    res.redirect(authUrl);
  } catch (err) {
    console.log(err);
    return res.status(500).send("Error during auth url generation");
  }
});

gmailRouter.get("/gmail/auth/callback", async (req, res) => {
  try {
    const code = String(req.query.code);
    await authenticateUser(code);
    res.end("User authenticated successfully");
  } catch (err) {
    console.log(err);
    return res.status(500).send("Error during token generation");
  }
});

gmailRouter.get("/mails", async (req, res) => {
  try {
    const maxCountMail = req.query.maxCountMail
      ? Number(req.query.maxCountMail)
      : 50;

    if (!req.query.emailId) {
      return res.status(400).send("Please provide a valid emailId");
    }

    const emailId = String(req.query.emailId);
    const mails = await getMails(emailId, maxCountMail);
    if (!mails) {
      // if no refresh token is present so we need to login again
      return res.redirect("/google/gmail/auth");
    }

    res.send(mails);
  } catch (err) {
    console.log(err);
    res.status(500).send("Error while getting mails for the provided emailId");
  }
}); 

gmailRouter.get("/mails/message", async (req, res) => {
  try {
    const messageId = String(req.query.messageId);

    if (!messageId) {
      return res.status(400).send("Please provide a valid messageId to get the specific mail");
    }

    if (!req.query.emailId) {
      return res.status(400).send("Please provide a valid emailId");
    }

    const emailId = String(req.query.emailId);
    const mail = await getSpecificMail(emailId, messageId);
    if (!mail) {
      // if no refresh token is present so we need to login again
      return res.redirect("/google/gmail/auth");
    }

    res.send(mail);
  } catch (err) {
    console.log(err);
    res.status(500).send("Error while getting mail for the provided emailId");
  }
}); 


// Send some mails using the toEmailId to the fromEmailId 
// Get the mail in this combination (from,to,messageId) 
// So the mail in the messageId will be parsed and labeled 
// And a reply mail will be sent to the user in toEmailId
gmailRouter.get("/send",async (req,res) => {
    try{
      // get the content of the mail of the provided messageId
      // put the { content,from,to} in the job queue
      

    }catch(err){

    }
});