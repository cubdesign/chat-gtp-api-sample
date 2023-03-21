import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import Head from "next/head";
import { useEffect, useRef, useState } from "react";
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
    {
      role: "system",
      content: "あなたは、ドラえもん。私はのび太くんです。",
    },
    // {
    //   role: "user",
    //   content: "こんにちは\nこんにちは",
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

  const { mutate, isLoading } = useMutation({
    mutationFn: async (messages: Message[]): Promise<Message> => {
      const res = await axios.post<ChatSuccessResponse>("/api/chat", {
        messages: messages,
      });
      return res.data.message;
    },
    onSuccess: (message: Message) => {
      console.log("onSuccess", message);
      setMessages((messages) => [...messages, message]);
    },
  });

  const scrollEndRef = useRef<HTMLDivElement>(null);

  const scrollBottom = () => {
    scrollEndRef?.current?.scrollIntoView();
  };

  useEffect(() => {
    if (messages.length > 0) {
      scrollBottom();
    }
  }, [messages]);

  return (
    <>
      <Head>
        <title>ChatGTP API sample</title>
        <meta name="description" content="ChatGTP API sample" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className="p-4">
        <h1 className="text-3xl">ChatGTP API sample</h1>
      </header>

      <main className="pb-[100px]">
        {messages.length > 0 ? (
          <ul>
            {messages.map((message, index) => (
              <MessageItem key={index} message={message} />
            ))}
          </ul>
        ) : (
          <div className="flex justify-center items-center  p-10 min-h-screen bg-slate-200">
            入力してください。
          </div>
        )}
        <div className={`${isLoading ? "block" : "hidden"}`}>...</div>
        <div ref={scrollEndRef}></div>
        <div className="fixed bottom-0 w-full bg-slate-300">
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
