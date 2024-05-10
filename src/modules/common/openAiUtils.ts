import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function getAiResponse(prompt: string) {
  const data = await openai.chat.completions.create({
    model: "gpt-3.5-turbo-0301",
    temperature: 0.7,
    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
  });

  return data;
}
