import { useEffect, useState } from "react";
import { getContacts } from "@/features/contacts/api.ts";
import { Contact } from "@/types.ts";

export const ContactList = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  useEffect(() => {
    getContacts().then((contacts) => setContacts(contacts));
  }, []);
  return (
    <div className="flex flex-col gap-y-[8px] p-1">
      {contacts.map((contact) => (
        <div className="h-[64px] bg-white w-full flex items-center rounded cursor-pointer hover:bg-gray-50">
          <img
            className="h-12 w-12 rounded-full object-fill ml-[10px]"
            src={contact.photo_url}
            alt={contact.name}
          />
          <div className="flex justify-between w-full items-center">
            <div className="ml-[10px]">
              <div className="text-md font-semibold text-gray-500">
                {contact.name}
              </div>
              <div className="text-xs text-gray-400">some message</div>
            </div>
            <div className="mr-2 text-xs text-gray-400">22:00</div>
          </div>
        </div>
      ))}
    </div>
  );
};
