import allContacts from "../../../db.contacts.json";
import type { Participant } from "@/types.ts";

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
