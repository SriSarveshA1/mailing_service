import { makeAxiosCall } from "../common/axiosUtils";
import {
  ACCESS_TYPE_FOR_OAUTH,
  GET_METHOD,
  SCOPE_FOR_OAUTH,
} from "../common/constants";
import { getValueFromCache, setValueToCache } from "../common/redisUtils";

const { OAuth2Client } = require("google-auth-library");

const redirectUri =
  `${process.env.HOST}:${process.env.PORT}` + process.env.REDIRECT_URI_PATH;

const oAuthClient = new OAuth2Client({
  clientId: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  redirectUri: redirectUri,
});

export function returnRedirectAuthUrl() {
  const authUrl = oAuthClient.generateAuthUrl({
    access_type: ACCESS_TYPE_FOR_OAUTH,
    scope: SCOPE_FOR_OAUTH,
  });
  return authUrl;
}

export async function authenticateUser(code: string) {
  const { tokens } = await oAuthClient.getToken(code);
  const accessToken = tokens.access_token;
  const refreshToken = tokens.refresh_token;

  oAuthClient.setCredentials(tokens);

  // Get user information
  const userInfoResponse = await makeAxiosCall(
    GET_METHOD,
    "https://www.googleapis.com/oauth2/v2/userinfo",
    accessToken
  );

  const userEmail = userInfoResponse.data.email;
  const accessTokenKey = `access_token_${userEmail}`;
  const refreshTokenKey = `refresh_token_${userEmail}`;

  await setValueToCache(accessTokenKey, accessToken);
  await setValueToCache(refreshTokenKey, refreshToken);
}

export async function getMails(emailId: string, maxCountMail: string | number) {
  const accessTokenKey = `access_token_${emailId}`;
  let accessToken = await getValueFromCache(accessTokenKey);

  if (!accessToken) {
    console.log("Getting access token from the refresh token");
    // if no access token is present use the refresh token to get the access token
    const refreshTokenKey = `refresh_token_${emailId}`;
    const refreshToken = await getValueFromCache(refreshTokenKey);
    if (!refreshToken) {
      // if no refresh token is present then redirect to /gmail/auth
      return false;
    }
    accessToken = await oAuthClient.getAccessToken();
    if (accessToken) {
      await setValueToCache(accessTokenKey, accessToken);
    }
  }

  const url = `https://gmail.googleapis.com/gmail/v1/users/${emailId}/messages?maxResults=${maxCountMail}`;

  const response = await makeAxiosCall(GET_METHOD, url, accessToken);

  return response.data;
}

export async function getSpecificMail(emailId: string,messageId:string) {
  const accessTokenKey = `access_token_${emailId}`;
  let accessToken = await getValueFromCache(accessTokenKey);

  if (!accessToken) {
    console.log("Getting access token from the refresh token");
    // if no access token is present use the refresh token to get the access token
    const refreshTokenKey = `refresh_token_${emailId}`;
    const refreshToken = await getValueFromCache(refreshTokenKey);
    if (!refreshToken) {
      // if no refresh token is present then redirect to /gmail/auth
      return false;
    }
    accessToken = await oAuthClient.getAccessToken();
    if (accessToken) {
      await setValueToCache(accessTokenKey, accessToken);
    }
  }

  const url = `https://gmail.googleapis.com/gmail/v1/users/${emailId}/messages/${messageId}`;

  const response = await makeAxiosCall(GET_METHOD, url, accessToken);

  return response.data;
}