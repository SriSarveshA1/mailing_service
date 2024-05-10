import axios from "axios";

export async function makeAxiosCall(
  method: string,
  url: string,
  accessToken: string
) {
  const config = {
    method,
    url,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  };
  const response = await axios(config);
  return response;
}
