"use client";
import { useCallback, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { message } from "antd";

type LoginValues = { email: string; password: string };

export function useEmailPasswordLogin() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const login = useCallback(async ({ email, password }: LoginValues) => {
    try {
      setIsLoading(true);
      const res = await signIn("credentials", { redirect: false, email, password });
      if (res?.error) {
        console.log("Sign in error:", res.error);
        message.error('User does not exist');
        return;
      }
      message.success("Signed in successfully");
      router.replace("/");
    } catch (e) {
      message.error("Failed to sign in");
    } finally {
      setIsLoading(false);
    }
  }, [router]);

  return { login, isLoading };
}
