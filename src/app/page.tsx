"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useLayoutEffect } from "react";
import { Button } from "antd";
import Link from "next/link";

export default function HomePage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useLayoutEffect(() => {
    if (session) {
      router.push("/dashboard");
    }
  }, [session, router]);

  if (status === "loading") {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }

  if (session) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
      <div className="max-w-md w-full mx-auto bg-white rounded-lg shadow-lg p-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Book Catalog</h1>
          <p className="text-gray-600 mb-8">
            Manage your personal book collection with ease
          </p>
          <Link href="/auth/signin">
            <Button type="primary" size="large" className="w-full">
              Get Started
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
