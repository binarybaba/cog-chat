import { useStoreContext } from "@/hooks/useStoreContext.ts";
import { ReactNode, useEffect, useState } from "react";
import { getParticipant } from "@/features/desk/api.ts";
import { Participant } from "@/types.ts";

export const Desk = ({ children }: { children: ReactNode }) => {
  const { store } = useStoreContext();
  const [participant, setParticipant] = useState<Participant>();
  const { activeChatParticipantId: activeId } = store;
  useEffect(() => {
    getParticipant(activeId).then((participant) => setParticipant(participant));
  }, [activeId]);
  return (
    <div className="flex-1 flex flex-col">
      <div className="h-[54px] flex items-center bg-gray-50 border-b border-b-gray-200">
        <img
          className="h-10 w-10 rounded-full object-fill ml-[16px] mr-[10px] select-none ring-1 ring-teal-100"
          src={participant?.photo_url}
          alt={participant?.name}
        />
        <div className="text-[14px] font-semibold">{participant?.name}</div>
      </div>
      {children}
    </div>
  );
};
