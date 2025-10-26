"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import type { User, Session } from "@supabase/supabase-js";

type AuthContextType = {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signUp: (
    email: string,
    password: string,
    name: string
  ) => Promise<{ error: any }>;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Check active session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signUp = async (email: string, password: string, name: string) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            display_name: name,
          },
        },
      })

      if (error) return { error }

    //   // After signup, redirect to login or dashboard
    //   if (data.user) {
    //     router.push("/dashboard")
    //   }

      return { error: null }
    } catch (error: any) {
      return { error }
    }
  }

  // const signUp = async (
  //   email: string,
  //   password: string,
  //   name: string,
  //   adminCode?: string
  // ) => {
  //   try {
  //     // Step 1: Create auth user
  //     const { data, error } = await supabase.auth.signUp({
  //       email,
  //       password,
  //       options: {
  //         data: { display_name: name },
  //       },
  //     });

  //     if (error) return { error };
  //     const user = data.user;
  //     if (!user) return { error: new Error("No user returned from sign-up") };

  //     // Step 2: Determine role
  //     let role = "user";
  //     if (adminCode && adminCode === "SECRET_ADMIN_CODE_123") {
  //       role = "admin";
  //     }

  //     // Step 3: Insert into `profiles` table
  //     const { error: profileError } = await supabase.from("profiles").insert({
  //       id: user.id,
  //       full_name: name,
  //       role: role,
  //     });

  //     if (profileError) {
  //       console.error("Profile insert failed:", profileError.message);
  //       return { error: profileError };
  //     }

  //     return { error: null };
  //   } catch (error: any) {
  //     return { error };
  //   }
  // };

  const signIn = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) return { error };

      if (data.user) {
        router.push("/dashboard");
      }

      return { error: null };
    } catch (error: any) {
      return { error };
    }
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        loading,
        signUp,
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
