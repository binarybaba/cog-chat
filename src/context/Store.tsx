// eslint-disable-next-line
// @ts-nocheck because fails in deployment. Must fix tomorrow.
import {
  createContext,
  Dispatch,
  ReactNode,
  useEffect,
  useReducer,
} from "react";
import type { Chat, Participant } from "@/types.ts";
import { Action, Actions } from "@/context/Action.ts";
import { getContacts } from "@/features/contacts/api.ts";
import { reducer } from "@/context/reducer.ts";
import { getChat } from "@/features/desk/api.ts";

export type Store = {
  sender: Participant;
  chat?: Chat;
  activeParticipantId: Participant["user_id"];
};

export const StoreContext = createContext<{
  store: Store;
  dispatch: Dispatch<Actions>;
}>({
  store: {
    sender: {
      user_id: "",
      photo_url: "",
      last_seen: "",
      name: "",
    },
    activeParticipantId: "",
  },
  dispatch: () => {},
});

export const StoreProvider = ({ children }: { children: ReactNode }) => {
  const defaultSender = {
    user_id: "amin",
    name: "Amin",
    photo_url: "https://dwdw.com",
    last_seen: new Date().toISOString(),
  };
  const initialState = {
    activeParticipantId: "",
    sender: {
      user_id: "",
      photo_url: "",
      last_seen: "",
      name: "",
    },
  };
  const [store, dispatch] = useReducer(reducer, initialState);

  /**
   * Prefilling this to have a default one selected here.
   * Ideally, these contacts will always be there (considering they're from a friend list or phone)
   */
  // TODO: Move this in a bootstrap
  useEffect(() => {
    getContacts().then(([contact]) => {
      dispatch({
        type: Action.SET_SENDER,
        payload: defaultSender,
      });
      dispatch({ type: Action.SET_PARTICIPANT, payload: contact.user_id });
      getChat({
        senderId: defaultSender.user_id,
        receiverId: contact.user_id,
      }).then((chat) => dispatch({ type: Action.SET_CHAT, payload: chat }));
    });
  }, []);
  return (
    <StoreContext.Provider value={{ store, dispatch }}>
      {children}
    </StoreContext.Provider>
  );
};
