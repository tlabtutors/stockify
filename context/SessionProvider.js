"use client";
import { createContext, useContext } from "react";
// Create context
const SessionContext = createContext(null);
// Hook to access session in client components
export function useSession() {
  return useContext(SessionContext);
}
// Provider component
export default function SessionProvider({ children, session }) {
  return (
    <SessionContext.Provider value={session}>
      {children}
    </SessionContext.Provider>
  );
}
