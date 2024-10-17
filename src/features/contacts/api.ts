import type { Participant } from "@/types.ts";
import allContacts from "../../../db.contacts.json";

/**
 * Ideally should be getContacts(ofPersonId: string, nextLimit: number)
 * the nextLimit should increment as they scroll in the contact list,
 */
export const getContacts = (): Promise<Participant[]> =>
  Promise.resolve(allContacts);
