import {
  createContext,
  Dispatch,
  ReactNode,
  useEffect,
  useReducer,
} from "react";
import type { Participant } from "@/types.ts";
import { Action } from "@/context/Action.ts";
import { getContacts } from "@/features/contacts/api.ts";

export type Store = {
  activeChatParticipantId: Participant["user_id"];
};

export type Actions =
  | {
      type: Action.SELECT_PARTICIPANT;
      payload: string;
    }
  | {
      type: Action.SEND_MESSAGE;
      payload: string;
    };

export const StoreContext = createContext<{
  store: Store;
  dispatch: Dispatch<Actions>;
}>({
  store: {
    activeChatParticipantId: "",
  },
  dispatch: () => {},
});

export const messagesReducer = (state: Store, action: Actions) => {
  const { type } = action;
  switch (type) {
    case Action.SELECT_PARTICIPANT: {
      const _state = {
        ...state,
        activeChatParticipantId: action.payload,
      };

      return _state;
    }
    case Action.SEND_MESSAGE: {
      // TODO: tx and push
      return state;
    }
    default:
      return state;
  }
};

export const StoreProvider = ({ children }: { children: ReactNode }) => {
  const initialState = { activeChatParticipantId: "" };
  const [store, dispatch] = useReducer(messagesReducer, initialState);

  /**
   * Prefilling this to have a default one selected here.
   * Ideally, these contacts will always be there (considering they're from a friend list or phone)
   */

  useEffect(() => {
    getContacts().then(([contact]) => {
      dispatch({ type: Action.SELECT_PARTICIPANT, payload: contact.user_id });
    });
  }, []);
  return (
    <StoreContext.Provider value={{ store, dispatch }}>
      {children}
    </StoreContext.Provider>
  );
};
