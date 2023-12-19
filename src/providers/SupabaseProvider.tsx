"use client";
import React, { useState } from "react";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { SessionContextProvider } from "@supabase/auth-helpers-react";

import { Database } from "../types/types_db";

interface SupabaseProviderProps {
  children: React.ReactNode;
}

const SupabaseProvider = (props: SupabaseProviderProps) => {
  const [supabaseClient] = useState(() =>
    createClientComponentClient<Database>()
  );
  return (
    <SessionContextProvider supabaseClient={supabaseClient}>
      {props.children}
    </SessionContextProvider>
  );
};

export default SupabaseProvider;
