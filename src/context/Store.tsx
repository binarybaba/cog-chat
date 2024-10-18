import {
  createContext,
  Dispatch,
  ReactNode,
  useEffect,
  useReducer,
} from "react";
import type { Chat, Participant } from "@/types.ts";
import { Action } from "@/context/Action.ts";
import { getContacts } from "@/features/contacts/api.ts";
import { makeMessage } from "@/context/handlers.ts";
import { getChat } from "@/features/desk/api.ts";

export type Store = {
  sender: Participant;
  chat?: Chat;
  activeChatParticipantId: Participant["user_id"];
};

export type Actions =
  | {
      type: Action.SET_PARTICIPANT;
      payload: string;
    }
  | {
      type: Action.SEND_MESSAGE;
      payload: {
        receiverId: Participant["user_id"];
        content: string;
      };
    }
  | { type: Action.SET_SENDER; payload: Participant }
  | { type: Action.SET_CHAT; payload: Chat };

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
    activeChatParticipantId: "",
  },
  dispatch: () => {},
});

export const messagesReducer = (state: Store, action: Actions) => {
  const { type } = action;
  switch (type) {
    case Action.SET_SENDER: {
      const { payload } = action;
      const _state = Object.assign({}, state);
      _state.sender = payload;
      return _state;
    }

    case Action.SET_PARTICIPANT: {
      return {
        ...state,
        activeChatParticipantId: action.payload,
      };
    }
    case Action.SET_CHAT: {
      const _state = Object.assign({}, state);
      _state.chat = action.payload;
      return _state;
    }
    case Action.SEND_MESSAGE: {
      const { payload } = action;
      const { receiverId, content } = payload;

      const message = makeMessage({
        sender: state.sender,
        receiverId,
        content,
      });
      const _state = Object.assign({}, state);
      _state.chat?.messages.push(message);
      console.log(_state);
      return _state;
    }
    default:
      return state;
  }
};

export const StoreProvider = ({ children }: { children: ReactNode }) => {
  const defaultSender = {
    user_id: "amin",
    name: "Amin",
    photo_url: "https://dwdw.com",
    last_seen: new Date().toISOString(),
  };
  const initialState = {
    activeChatParticipantId: "",
    sender: {
      user_id: "",
      photo_url: "",
      last_seen: "",
      name: "",
    },
  };
  const [store, dispatch] = useReducer(messagesReducer, initialState);

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
