import classNames from "classnames";
import { useStoreContext } from "@/hooks/useStoreContext.ts";
import { Contact } from "@/types.ts";
import { Action } from "@/context/Action.ts";

type Props = {
  id: Contact["user_id"];
  name: string;
  photoUrl: Contact["photo_url"];
};
export const ChatContact = ({ id, photoUrl, name }: Props) => {
  const {
    store: { activeChatParticipantId: activeId },
    dispatch,
  } = useStoreContext();
  const handleContactClick = (payload: string) => {
    dispatch({ type: Action.SELECT_PARTICIPANT, payload });
  };

  return (
    <div
      key={id}
      className={classNames(
        "h-[64px] bg-white w-full flex items-center rounded cursor-pointer transition-colors",
        {
          "bg-gray-100": activeId === id,
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
          <div className="text-xs text-gray-400 select-none">some message</div>
        </div>
        <div className="mr-2 text-xs text-gray-400 select-none">22:00</div>
      </div>
    </div>
  );
};
