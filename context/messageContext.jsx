"use client";

import { getUnreadMessagesCount } from "@/app/actions/getUnReadMessagesCount";
import { useSession } from "next-auth/react";

const { createContext, useContext, useState, useEffect } = require("react");

const MessagesContext = createContext();

export function MessagesProvider({ children }) {
  const [unreadCount, setUnReadCount] = useState(0);

  const { data: session } = useSession();

  useEffect(() => {
    if (session && session.user) {
      getUnreadMessagesCount().then((res) => {
        if (res.count) setUnReadCount(res.count);
      });
    }
  }, [session]);

  return (
    <MessagesContext.Provider value={{ unreadCount, setUnReadCount }}>
      {children}
    </MessagesContext.Provider>
  );
}

export function useMessages() {
  return useContext(MessagesContext);
}
