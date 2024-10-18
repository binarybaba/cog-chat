import { useStoreContext } from "@/hooks/useStoreContext.ts";
import classNames from "classnames";
import { useEffect, useRef } from "react";

const toHHmm = (datestring: string) => {
  const date = new Date(datestring);
  return `${String(date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}`;
};

export const Chat = () => {
  const crawler = useRef<HTMLDivElement | null>(null);
  const { store } = useStoreContext();
  const chat = store.chat;
  const senderId = store.sender.user_id;

  useEffect(() => {
    // To push up the chat whenever a new message comes;
    if (crawler.current) {
      crawler.current.scrollIntoView();
    }
  }, [chat?.messages]);

  if (!chat) {
    return <div>Empty. Start a new chat</div>;
  }
  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {chat.messages.map((message) => (
        <div className="flex justify-between items-center">
          <div>
            <div
              className={classNames("text-[12px] font-semibold leading-tight", {
                "text-teal-600": message.sender.user_id !== senderId,
                "text-gray-700": message.sender.user_id === senderId,
              })}
            >
              {message.sender.user_id === senderId
                ? "You"
                : message.sender.name}
            </div>
            <div className="text-[14px] text-gray-700 max-w-[940px] leading-tight">
              {message.content}
            </div>
          </div>
          <div className="text-[12px] text-gray-400">
            {toHHmm(message.timestamp)}
          </div>
        </div>
      ))}
      <div ref={crawler} />
    </div>
  );
};
