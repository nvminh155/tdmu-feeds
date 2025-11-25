"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
} from "react";
import { Session, User } from "@supabase/supabase-js";
import { useQuery } from "@tanstack/react-query";

import createClient from "@/lib/supabase/client";

interface SessionContextType {
  user: User | null;
  session: Session | null;
}

const SessionContext = createContext<SessionContextType | undefined>(undefined);

interface SessionProviderProps {
  children: ReactNode;
}

export function SessionProvider({ children }: SessionProviderProps) {
  const supabase = createClient();

  const query = useQuery({
    queryKey: ["session"],
    queryFn: async () => {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();
      // if (session) {
      //   handleLoginDkmh(session);
      // }
      return session;
    },
  });

  useEffect(() => {
    const sub = supabase.auth.onAuthStateChange((event, session) => {
      query.refetch();
    });

    return () => {
      sub.data.subscription.unsubscribe();
    };
  }, []);

  const value = useMemo(() => {
    const { data: session } = query;

    return {
      user: session?.user ?? null,
      session: session ?? null,
    };
  }, [query]);

  return (
    <SessionContext.Provider value={value}>{children}</SessionContext.Provider>
  );
}

export function useSession() {
  const context = useContext(SessionContext);
  if (context === undefined) {
    throw new Error("useSession must be used within a SessionProvider");
  }
  return context;
}
