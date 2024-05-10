import express from "express";
import { OAuth2Client } from "google-auth-library";
import nodemailer from "nodemailer";
import { authenticateUser, returnRedirectAuthUrl } from "./gmail.provider";
require("dotenv").config();

export const gmailRouter = express.Router();

gmailRouter.get("/gmail/auth", async (req, res) => {
  try {
    const authUrl = returnRedirectAuthUrl();
    res.redirect(authUrl);
  } catch (err) {
    console.log(err);
    res.status(500).send("Error during auth url generation");
  }
});

gmailRouter.get("/gmail/auth/callback", async (req, res) => {
  try {
    const code = String(req.query.code);
    await authenticateUser(code);
    res.end("User authenticated successfully");
  } catch (err) {
    console.log(err);
    res.status(500).send("Error during token generation");
  }
});

// gmailRouter.get("/gmail/auth/mails", async (req, res) => {
//     try {
       
//        const refreshToken = 
//        res.write("Logged out");
       
       
//        res.redirect("/gmail/auth"); 
       
       

//     }catch (err) {

//     }
// });

