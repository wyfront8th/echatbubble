import { AnimatePresence } from "framer-motion";
import React, { useCallback, useRef, useState } from "react";
import Bubble from "./bubble";
import BubbleInput from "./bubble-input";
import Chat from "./chat";
import useMessages from "./use-messages";

function App() {
  const [newMessage, setNewMessage] = useState<string>("");
  const [messages, addMessage] = useMessages([]);
  const refDiv = useRef<HTMLDivElement>();

  const handleSubmit = useCallback(
    (bubbleHeigh: number) => {
      if (newMessage.length > 0) {
        addMessage({
          id: +new Date(),
          text: newMessage,
          height: bubbleHeigh,
        });
        setNewMessage("");
      }
    },
    [newMessage, messages]
  );

  const lastMessage = messages[messages.length - 1];
  const dy = lastMessage ? lastMessage.height : 0;
  const setBackground = (e: React.KeyboardEvent): void => {
    const keyCode = e.keyCode;
    const keyCombination = e.ctrlKey;
    if (keyCombination && keyCode == 75) {
      refDiv.current.style.backgroundColor = "#1e293b";
    }
    if (keyCombination && keyCode == 72) {
      refDiv.current.style.backgroundColor = "";
    }
  };
  return (
    <div
      className="App w-72 h-screen flex flex-col-reverse rounded-lg"
      style={{ backgroundColor: "#1e293b" }}
      onKeyDown={setBackground}
      ref={refDiv}
    >
      <Chat>
        <AnimatePresence>
          {messages.map((m) => (
            <Bubble key={m.id} id={m.id} dy={dy}>
              {m.text}
            </Bubble>
          ))}
        </AnimatePresence>
        <BubbleInput
          value={newMessage}
          onChange={setNewMessage}
          onSubmit={handleSubmit}
        />
      </Chat>
    </div>
  );
}

export default App;
