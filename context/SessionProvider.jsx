"use client";

import { SessionContext } from "./SessionContext";

export default function SessionProvider({ children, session }) {
  return (
    <SessionContext.Provider value={session}>
      {children}
    </SessionContext.Provider>
  );
}
