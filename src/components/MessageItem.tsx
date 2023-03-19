import { FC } from "react";
import { Message } from "@/pages";

type MessageItemProps = {
  message: Message;
};

const MessageItem: FC<MessageItemProps> = ({ message }) => {
  return (
    <li className={`mt-4 message ${message.role}`}>
      <div>{message.role}</div>
      <div>{message.content}</div>{" "}
    </li>
  );
};

export default MessageItem;
