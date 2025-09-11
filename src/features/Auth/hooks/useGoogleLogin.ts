"use client";
import { useCallback, useState } from "react";
import { signIn } from "next-auth/react";

export function useGoogleLogin() {
  const [isLoading, setIsLoading] = useState(false);

  const loginWithGoogle = useCallback(async () => {
    try {
      setIsLoading(true);
      await signIn("google", { callbackUrl: "/" });
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { loginWithGoogle, isLoading };
}
