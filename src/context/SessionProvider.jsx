import { useEffect, useState } from "react";
import SessionContext from "./SessionContext";
import supabase from "../supabase/supabase-client";

function SessionProvider({ children }) {
  const [session, setSession] = useState(supabase.auth.getSession?.() || null);

  useEffect(() => {
    // ascolta i cambiamenti di sessione
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return (
    <SessionContext.Provider value={{ session }}>
      {children}
    </SessionContext.Provider>
  );
}

export default SessionProvider;
