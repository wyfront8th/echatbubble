import { ReactNode } from "react";

function Chat({ children }: { children: ReactNode }): JSX.Element {
  return (
    <div
      className="chat flex 
      relative flex-col flex-wrap items-start pl-8 pb-20"
    >
      {" "}
      {children}
    </div>
  );
}

export default Chat;
