import { createContext, Dispatch, ReactNode, useReducer } from "react";
import type { Participant } from "@/types.ts";
import { Action } from "@/context/Action.ts";

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
  return (
    <StoreContext.Provider value={{ store, dispatch }}>
      {children}
    </StoreContext.Provider>
  );
};
