"use client";

import { useEffect, useLayoutEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
export default function HomePage() {
  const { status } = useSession();
  const router = useRouter();

  useLayoutEffect(() => {
    if (status === "authenticated") {
      router.push("/dashboard");
    } else if (status === "unauthenticated") {
      router.push("/auth/signin");
    }
  }, [status]);

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div>Redirecting...</div>
    </div>
  );
}
