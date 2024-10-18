import type { Chat, Participant } from "@/types.ts";

export enum Action {
  SET_PARTICIPANT = "SET_PARTICIPANT",
  SET_CHAT = "SET_CHAT",
  SEND_MESSAGE = "SEND_MESSAGE",
  SET_SENDER = "SET_SENDER",
}
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
