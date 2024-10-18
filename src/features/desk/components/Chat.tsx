import { useStoreContext } from "@/hooks/useStoreContext.ts";
import { Message } from "@/features/desk/components/Message.tsx";
import { useEffect, useRef } from "react";

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

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {chat?.messages.map(({ sender, timestamp, content }) => (
        <Message
          isSelf={sender.user_id === senderId}
          senderName={sender.name}
          content={content}
          timestamp={timestamp}
        />
      ))}
      <div ref={crawler} />
    </div>
  );
};
