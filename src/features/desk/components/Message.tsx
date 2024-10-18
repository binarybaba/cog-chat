import classNames from "classnames";

type Props = {
  content: string;
  timestamp: string;
  isSelf: boolean;
  senderName: string;
};

const toHHmm = (dateString: string) => {
  const date = new Date(dateString);
  return `${String(date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}`;
};

export const Message = ({ content, timestamp, isSelf, senderName }: Props) => {
  return (
    <div className="flex justify-between items-center">
      <div>
        <div
          className={classNames("text-[12px] font-semibold leading-tight", {
            "text-teal-600": !isSelf,
            "text-gray-700": isSelf,
          })}
        >
          {isSelf ? "You" : senderName}
        </div>
        <div className="text-[14px] text-gray-700 max-w-[940px] leading-tight">
          {content}
        </div>
      </div>
      <div className="text-[12px] text-gray-400">{toHHmm(timestamp)}</div>
    </div>
  );
};
