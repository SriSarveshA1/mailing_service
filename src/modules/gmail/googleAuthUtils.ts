import { OAuth2Client } from "google-auth-library";

const redirectUri =
  `${process.env.HOST}:${process.env.PORT}` + process.env.REDIRECT_URI_PATH;

export const oAuthClient = new OAuth2Client({
  clientId: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  redirectUri: redirectUri,
});
