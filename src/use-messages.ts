import { useCallback, useState } from "react";

interface Msg {
  id: number;
  text: string;
  height: number;
}

const useMessages = (initialValue: Msg[]): [Msg[], (msg: Msg) => void] => {
  const [messages, setMessages] = useState(initialValue);

  const addMessage = useCallback(
    (msg: Msg) => {
      setMessages((messages) => [...messages, msg]);
      setTimeout(() => {
        setMessages((current) => {
          const n = [...current];
          n.shift();
          return n;
        });
      }, 15000);
    },
    [setMessages]
  );
  return [messages, addMessage];
};

export default useMessages;
