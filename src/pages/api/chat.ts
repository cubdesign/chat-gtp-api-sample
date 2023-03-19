// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { Configuration, OpenAIApi } from "openai";
import { Message } from "..";

export type ChatSuccessResponse = {
  message: Message;
};

export type ChatFallbackResponse = {
  message: string;
};

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ChatSuccessResponse | ChatFallbackResponse>
) {
  console.log(req.body.messages);
  let messages = [];

  req.body.messages && (messages = req.body.messages);

  try {
    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo-0301",
      messages: messages,
    });

    const message = response.data.choices[0].message;
    console.log(response.data);
    console.log(message);
    res.status(200).json({
      message: {
        role: "assistant",
        content: message!.content!.trim(),
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "failed to load data " });
  }
}
