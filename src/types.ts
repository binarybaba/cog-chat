export type Contact = {
  user_id: string;
  name: string;
  photo_url: string;
  last_seen: string;
};

export type MessageReaction = {
  reaction: string;
  user_id: Contact["user_id"];
  timestamp: string;
};

export type Message = {
  message_id: "string";
  sender: Contact;
  receiver: Contact;
  content: string;
  reactions?: MessageReaction[];
  timestamp: string; // ISO
};

export type Chat = {
  chat_id: string;
  chat_type: "1:1" | "m:m"; // DM, group chat/channel
  participants: Contact["user_id"][];
  messages: Message[];
};
