"use client";
import { useCallback, useState } from "react";
import { signIn } from "next-auth/react";

export function useGoogleLogin() {
  const [isLoading, setIsLoading] = useState(false);

  const loginWithGoogle = useCallback(async () => {
    try {
      setIsLoading(true);
      // Redirect back to the app root after successful auth
      await signIn("google", { callbackUrl: "/" });
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { loginWithGoogle, isLoading };
}
