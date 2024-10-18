import { useStoreContext } from "@/hooks/useStoreContext.ts";
import { useRef, useState } from "react";

const MIN_HEIGHT = 80;

export const TextArea = () => {
  const { store } = useStoreContext();
  const [text, setText] = useState("");
  const ref = useRef<HTMLTextAreaElement>(null);

  const sendMessage = async () => {
    console.log(text);
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
    <div className="p-4 border-t">
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
