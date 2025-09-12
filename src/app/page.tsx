"use client";

import { useEffect, useLayoutEffect } from "react";
import { useSession } from "next-auth/react";

export default function HomePage() {
  const { status } = useSession();

  useLayoutEffect(() => {
    if (status === "authenticated") {
      window.location.href = "/dashboard";
    } else if (status === "unauthenticated") {
      window.location.href = "/auth/signin";
    }
  }, [status]);

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div>Redirecting...</div>
    </div>
  );
}
