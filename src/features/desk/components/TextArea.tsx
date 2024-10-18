import { useStoreContext } from "@/hooks/useStoreContext.ts";
import { useEffect, useRef, useState } from "react";
import { Action } from "@/context/Action.ts";

const MIN_HEIGHT = 80;

export const TextArea = () => {
  const { store, dispatch } = useStoreContext();
  const receiverId = store.activeChatParticipantId;
  const [text, setText] = useState("");
  const ref = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    setText("");
  }, [receiverId]);

  const sendMessage = async () => {
    dispatch({
      type: Action.SEND_MESSAGE,
      payload: { receiverId, content: text },
    });
    setText("");
    // because there's a race between what's rendered and what's in ref
    setTimeout(() => {
      resizeTextarea();
    }, 0);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  /**
   * Makes the text area grow and shrink with constraints. Constraints covered in css classes
   */
  const resizeTextarea = () => {
    const textarea = ref.current;
    if (!textarea) return;
    textarea.style.height = `${MIN_HEIGHT}px`;
    textarea.style.height = `${textarea.scrollHeight}px`;
  };

  const handleOnChange = (e) => {
    const { target } = e;
    const { value: text } = target;
    setText(text);
    resizeTextarea();
  };

  return (
    <div className="p-4 border-t bg-gray-50">
      <textarea
        ref={ref}
        value={text}
        rows={1}
        onChange={handleOnChange}
        onKeyDown={handleKeyDown}
        className={`w-full border rounded p-[24px] focus:outline-0 overflow-y-scroll resize-none max-h-[200px] min-h-[${MIN_HEIGHT}px]`}
      />
    </div>
  );
};
