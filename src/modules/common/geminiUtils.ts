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
}

export async function analyzeTheLabelOfTheContent(mailBody: string) {
  const label:string = await getAiResponse(
    `Analyze this mail content and provide a label like Interested, Not Interested, More Information based on the content "${mailBody}"`
  );
  return label;
}

export async function constructTheResponse(mailBody: string,label:string,product_name:string) {
  const replyMessage:string = await getAiResponse(
    `This mail content "${mailBody}" has a tone "${label}" for our services and products ,provide a reply message personalized on the main content and as per the tone 
     and if the tone is like Interested then reply message should be asking for a time to schedule a demo
     or if the tone is like Not Interested then the reply message should be asking feedback and convince them to check the product
     or if the tone is like More Information then the reply message should be asking for which particular information is wanted
    
     And the starting of this email reply should be the greet like "Hi Valuable customer" and in the best regards put "${product_name} Team" as this reply mail is sent from them to the customer.
        
     `
  );
  return replyMessage;
}
