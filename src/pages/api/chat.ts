// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { Configuration, OpenAIApi } from "openai";

type SuccessResponse = {
  answer: string;
};

type FallbackResponse = {
  message: string;
};

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<SuccessResponse | FallbackResponse>
) {
  let prompt = "";

  req.body.prompt && (prompt = req.body.prompt);

  try {
    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo-0301",
      messages: [{ role: "user", content: prompt }],
    });

    const answer = response.data.choices[0].message?.content;
    console.log(response.data);
    res.status(200).json({ answer: answer! });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "failed to load data " });
  }
}
