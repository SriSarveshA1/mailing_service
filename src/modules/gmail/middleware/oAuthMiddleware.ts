// This middleware gets the access token from the user.
// And we need to validate the access token against the
// Here we declare a method that gets the access token from the user during the api calling

import {
  RequestWithAccessToken,
  RequestWithAccessTokenAndEmail,
} from "../../../types";
import { makeAxiosCall } from "../../common/axiosUtils";
import { GET_METHOD } from "../../common/constants";
import express from "express";
import { oAuthClient } from "../googleAuthUtils";

export async function validateAccessToken(
  req: RequestWithAccessToken,
  res: express.Response,
  next: express.NextFunction
) {
  try {
    const token = req.headers.token;
    if (!token) {
      return res.status(400).end("Please provide a valid token");
    }

    const accessToken = String(token);

    const url = `https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${accessToken}`;

    // If the token is not valid it will be throw error
    await makeAxiosCall(GET_METHOD, url, accessToken);

    req.accessToken = accessToken;
    oAuthClient.setCredentials({ access_token: accessToken });

    next();
  } catch (error: any) {
    if (error.response.data.error == "invalid_token") {
      return res.status(400).send("Invalid token provided");
    }

    return res.status(500).send("Error while validating access token");
  }
}

export async function getEmailIdFromToken(
  req: RequestWithAccessTokenAndEmail,
  res: express.Response,
  next: express.NextFunction
) {
  try {
    const accessToken = req.accessToken;

    const userInfoResponse = await makeAxiosCall(
      GET_METHOD,
      "https://www.googleapis.com/oauth2/v2/userinfo",
      accessToken
    );

    const emailId = userInfoResponse.data.email;

    req.emailId = emailId;
    next();
  } catch (error) {
    return res
      .status(500)
      .send("Error while retrieving emailId using access token");
  }
}
