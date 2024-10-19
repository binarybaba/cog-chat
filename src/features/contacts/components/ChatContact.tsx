import classNames from "classnames";
import { useStoreContext } from "@/hooks/useStoreContext.ts";
import { Participant } from "@/types.ts";
import { Action } from "@/context/Action.ts";
import { getChat } from "@/features/desk/api.ts";

const toDDMM = (datestring: string) => {
  const date = new Date(datestring);
  return `${String(date.getDay()).padStart(2, "0")}.${String(date.getMonth()).padStart(2, "0")}`;
};

type Props = {
  id: Participant["user_id"];
  name: string;
  photoUrl: Participant["photo_url"];
  lastSeen: string;
};

export const ChatContact = ({ id, photoUrl, name, lastSeen }: Props) => {
  const { store, dispatch } = useStoreContext();
  const activeId = store.activeParticipantId;
  const senderId = store.sender.user_id;
  const handleContactClick = (payload: string) => {
    dispatch({ type: Action.SET_PARTICIPANT, payload });
    getChat({ receiverId: payload, senderId }).then((chat) => {
      dispatch({
        type: Action.SET_CHAT,
        payload: chat,
      });
    });
  };

  return (
    <div
      key={id}
      className={classNames(
        "h-[64px] bg-white w-full flex items-center rounded cursor-pointer transition-colors ",
        {
          "bg-gray-200": activeId === id,
          "hover:bg-gray-50": activeId !== id,
        },
      )}
      onClick={() => handleContactClick(id)}
    >
      <img
        className="h-12 w-12 rounded-full object-fill ml-[10px] select-none ring-1 ring-teal-100"
        src={photoUrl}
        alt={name}
      />
      <div className="flex justify-between w-full items-center">
        <div className="ml-[10px]">
          <div
            className={classNames(
              "text-md font-semibold text-gray-500 select-none",
              {
                "text-gray-800": activeId === id,
              },
            )}
          >
            {name}
          </div>
          <div className="text-xs text-gray-400 select-none max-w-[100px] truncate">
            last active: {toDDMM(lastSeen)}
          </div>
        </div>
        <div className="mr-2 text-xs text-gray-400 select-none">22:00</div>
      </div>
    </div>
  );
};
