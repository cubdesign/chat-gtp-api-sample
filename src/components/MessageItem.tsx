import { FC } from "react";
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
        {message.content.split("\n").map((text, index) => {
          return (
            <span key={index}>
              {text}
              <br />
            </span>
          );
        })}
      </div>
    </li>
  );
};

export default MessageItem;
