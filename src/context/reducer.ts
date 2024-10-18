import { Action, Actions } from "@/context/Action.ts";
import { makeMessage } from "@/context/handlers.ts";
import { Store } from "@/context/Store.tsx";

export const reducer = (state: Store, action: Actions) => {
  const { type } = action;
  switch (type) {
    case Action.SET_SENDER: {
      const { payload } = action;
      return {
        ...state,
        sender: payload,
      };
    }

    case Action.SET_PARTICIPANT: {
      return {
        ...state,
        activeParticipantId: action.payload,
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
      return {
        ...state,
        chat: {
          ...state.chat,
          messages: [...(state.chat?.messages || []), message],
        },
      };
    }
    default:
      return state;
  }
};
