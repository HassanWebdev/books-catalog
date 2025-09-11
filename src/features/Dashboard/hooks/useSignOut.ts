"use client";

import { signOut } from "next-auth/react";

export function useSignOut() {
  const handleSignOut = () => {
    signOut({ callbackUrl: "/auth/signin" });
  };

  return { handleSignOut };
}
