import { v4 as uuid } from "uuid";
import allContacts from "../../db.contacts.json";
import type { Message, Participant } from "@/types.ts";

type Props = {
  receiverId: Participant["user_id"];
  sender: Participant;
  content: string;
};

export const getParticipantById = (id: string): Participant => {
  // @ts-expect-error we will find it.
  return allContacts.find((contact: Participant) => contact.user_id === id);
};

/**
 * Add more business logic here...
 */
export const makeMessage = ({
  receiverId,
  sender,
  content,
}: Props): Message => ({
  message_id: uuid(),
  timestamp: new Date().toISOString(),
  receiver: getParticipantById(receiverId),
  sender,
  content,
});
