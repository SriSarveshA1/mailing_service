import axios from "axios";
import { AxiosRequest } from "../../types";

export async function makeAxiosCall(
  method: string,
  url: string,
  token: any,
  data?:any
) {
  const config:AxiosRequest = {
    method,
    url,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };

  if(data) {
    config.data = data;
  }

  const response = await axios(config);
  return response;
}



