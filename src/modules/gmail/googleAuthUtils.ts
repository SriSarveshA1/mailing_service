import { OAuth2Client } from "google-auth-library";
import { makeAxiosCall } from "../common/axiosUtils";
import { GET_METHOD } from "../common/constants";

const redirectUri =
  `${process.env.HOST}:${process.env.PORT}` + process.env.REDIRECT_URI_PATH;

export const oAuthClient: OAuth2Client = new OAuth2Client({
  clientId: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  redirectUri: redirectUri,
});

export async function isValidToken(token: string): Promise<boolean> {
  try {
    if (!token) {
      return false;
    }

    const accessToken = String(token);

    const url = `https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${accessToken}`;

    // If the token is not valid it will be throw error
    await makeAxiosCall(GET_METHOD, url, accessToken);
  } catch (err) {
    return false;
  }
  return true;
}

export async function getNewAccessToken(refreshToken: string) {
  oAuthClient.setCredentials({
    refresh_token: refreshToken,
  });

  const response = await oAuthClient.getAccessToken();

  return response.res?.data.access_token;
}
