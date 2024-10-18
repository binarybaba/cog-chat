import { useEffect, useState } from "react";
import { getContacts } from "@/features/contacts/api.ts";
import { Participant } from "@/types.ts";
import { ChatContact } from "@/features/contacts/components/ChatContact.tsx";

export const ContactList = () => {
  const [contacts, setContacts] = useState<Participant[]>([]);
  useEffect(() => {
    /**
     * Doesn't make sense to use thunks for such a small app
     * I'm an async/await fan. But since it doesn't have first class support
     * in useEffect... well... here we go:
     */
    getContacts().then((contacts) => setContacts(contacts));
  }, []);

  return (
    <div className="flex flex-col gap-y-[8px] p-1">
      {contacts.map(({ user_id, photo_url, name, last_seen }) => (
        <ChatContact
          key={user_id}
          id={user_id}
          photoUrl={photo_url}
          name={name}
          lastSeen={last_seen}
        />
      ))}
    </div>
  );
};
