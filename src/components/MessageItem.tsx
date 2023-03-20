import { FC, useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dark } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { Message } from "@/pages";

type MessageItemProps = {
  message: Message;
  className?: string;
};

const MessageItem: FC<MessageItemProps> = ({ message, className }) => {
  return (
    <li
      className={`mt-4 message flex flex-row ${
        message.role === "user" ? "flex-row-reverse" : ""
      } ${className}`}
    >
      <div>{message.role}</div>
      <div
        className={`p-3 rounded-3xl ${
          message.role === "user" ? "bg-green-400" : "bg-gray-200"
        }`}
      >
        <ReactMarkdown
          components={{
            code({ node, inline, className, children, ...props }) {
              const match = /language-(\w+)/.exec(className || "");
              return !inline && match ? (
                <SyntaxHighlighter
                  language={match[1]}
                  PreTag="div"
                  {...props}
                  style={dark}
                >
                  {String(children).replace(/\n$/, "")}
                </SyntaxHighlighter>
              ) : (
                <code className={className} {...props}>
                  {children}
                </code>
              );
            },
          }}
        >
          {message.content}
        </ReactMarkdown>
      </div>
    </li>
  );
};

export default MessageItem;
