import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import Head from "next/head";
import { useState } from "react";
import { ChatSuccessResponse } from "./api/chat";
import InputForm from "@/components/InputForm";
import MessageItem from "@/components/MessageItem";

export type MessageRole = "system" | "assistant" | "user";

export type Message = {
  // id: string;
  role: MessageRole;
  content: string;
};

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([
    // {
    //   role: "user",
    //   content: "sendMessagesこんにちは",
    // },
    // {
    //   role: "assistant",
    //   content: "こんにちは",
    // },
    // {
    //   role: "user",
    //   content: "こんにちは 2",
    // },
    // {
    //   role: "assistant",
    //   content: "こんにちは 3",
    // },
  ]);

  const { mutate } = useMutation({
    mutationFn: async (messages: Message[]): Promise<Message> => {
      const res = await axios.post<ChatSuccessResponse>("/api/chat", {
        messages: messages,
      });
      return res.data.message;
    },
    onSuccess: (message: Message) => {
      console.log("onSuccess", message);
      setMessages([...messages, message]);
    },
  });

  return (
    <>
      <Head>
        <title>ChatGTP API sample</title>
        <meta name="description" content="ChatGTP API sample" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="">
        <h1 className="text-3xl">ChatGTP API sample</h1>

        {messages.length > 0 ? (
          <ul>
            {messages.map((message, index) => (
              <MessageItem key={index} message={message} />
            ))}
          </ul>
        ) : (
          <div className="p-10 bg-slate-100">入力してください。</div>
        )}
        <div className="fixed bottom-0 w-full bg-white">
          <InputForm
            onSubmit={(text) => {
              const newMessages: Message[] = [
                ...messages,
                { role: "user", content: text },
              ];
              setMessages(newMessages);
              mutate(newMessages);
              console.log("onSubmit", text);
            }}
          />
        </div>
      </main>
    </>
  );
}
