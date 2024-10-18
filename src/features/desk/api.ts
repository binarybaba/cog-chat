import allContacts from "../../../db.contacts.json";
import allChats from "../../../db.chats.json";
import type { Chat, Participant } from "@/types.ts";

export const getParticipant = (id: string): Promise<Participant> => {
  const contact = allContacts.find((contact) => contact.user_id === id);
  // @ts-expect-error it will always be resolved since we doing static db.
  return Promise.resolve(contact);
  /**
   * but in cases where it doesn't find anything,
   * ideally it should ideally return a similar shape with empty strings so
   * things can fail at a consumption level
   */
};

export const getChat = ({
  senderId,
  receiverId,
}: {
  senderId: string;
  receiverId: string;
}): Promise<Chat> => {
  const chat = allChats.find(
    (chat) =>
      chat.participants.includes(senderId) &&
      chat.participants.includes(receiverId),
  );
  // @ts-expect-error it will always be resolved since we doing static db.
  return Promise.resolve(chat);
};
