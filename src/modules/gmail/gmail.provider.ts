import { addJobToQueue } from "../../jobs/producer";
import { makeAxiosCall } from "../common/axiosUtils";
import { getLabelIdFromLabel } from "../common/commonUtils";
import {
  ACCESS_TYPE_FOR_OAUTH,
  GET_METHOD,
  POST_METHOD,
  SCOPE_FOR_OAUTH,
} from "../common/constants";

import { oAuthClient } from "./googleAuthUtils";

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

  return {
    access_token: accessToken,
    refresh_token: refreshToken,
  };
}

export async function getMails(
  emailId: string,
  maxCountMail: string | number,
  accessToken: string
) {
  const url = `https://gmail.googleapis.com/gmail/v1/users/${emailId}/messages?maxResults=${maxCountMail}`;

  const response = await makeAxiosCall(GET_METHOD, url, accessToken);

  return response.data;
}

export async function getMailFromMessageId(
  emailId: string,
  messageId: string,
  accessToken: string
) {
  const url = `https://gmail.googleapis.com/gmail/v1/users/${emailId}/messages/${messageId}?format=full`;

  const response = await makeAxiosCall(GET_METHOD, url, accessToken);
  return response.data;
}

export async function sendEmailInQueue(
  emailId: string,
  messageId: string,
  accessToken: string
) {
  const job = {
    fromEmailId: emailId,
    messageId: messageId,
    accessToken: accessToken,
  };

  return await addJobToQueue(job);
}

export async function getRefreshToken(refresh_token: string) {
  const data = {
    client_id: process.env.GOOGLE_CLIENT_ID,
    client_secret: process.env.GOOGLE_CLIENT_SECRET,
    refresh_token: refresh_token,
    grant_type: "refresh_token",
  };

  const response = await makeAxiosCall(
    POST_METHOD,
    "https://oauth2.googleapis.com/token",
    refresh_token,
    data
  );

  oAuthClient.setCredentials(response.data);
  console.log(response);
  return response.data.access_token;
}

export async function assignLabelToMail(
  emailId: string,
  messageId: string,
  accessToken: string,
  label: string
) {
  const url = `https://gmail.googleapis.com/gmail/v1/users/${emailId}/messages/${messageId}/modify`;

  const labelId = getLabelIdFromLabel(label);

  const data = {
    addLabelIds: [`${labelId}`],
    removeLabelIds: [],
  };

  return await makeAxiosCall(POST_METHOD, url, accessToken, data);
}

export async function getAllLabelsForEmailId(
  emailId: string,
  accessToken: string
) {
  const url = `https://gmail.googleapis.com/gmail/v1/users/${emailId}/labels`;

  return await makeAxiosCall(GET_METHOD, url, accessToken);
}
