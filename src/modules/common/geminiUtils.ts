import axios from "axios";
import { makeAxiosCall } from "./axiosUtils";
import { POST_METHOD } from "./constants";

export async function getAiResponse(prompt: string) {
  const gen_api_key = process.env.GEMINI_API_KEY;

  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${gen_api_key}`;
  const modelResponse: any = await axios({
    method: POST_METHOD,
    url,
    headers: {
      "Content-Type": "application/json",
    },
    data: {
      contents: [
        {
          parts: [
            {
              text: prompt,
            },
          ],
        },
      ],
    },
  });

  return modelResponse.data.candidates[0].content.parts[0].text;
  //return modelResponse.data.candidates;
}

export async function analyzeTheLabelOfTheContent(mailContent: string) {
  const label = await getAiResponse(
    `Analyze this mail content and provide a label it like Interested,Not Interested, MoreInformation based on the content "${mailContent}"`
  );
  return label;
}
