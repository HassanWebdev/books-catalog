"use client";
import { useState } from "react";
import { message } from "antd";
import axios from "axios";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

type RegisterFormValues = {
  email: string;
  password: string;
  name?: string;
};

export function useEmailPasswordRegister() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const register = async (values: RegisterFormValues) => {
    setIsLoading(true);
    try {
      const response = await axios.post("/api/register", {
        email: values.email,
        password: values.password,
        name: values.name,
      });

      if (response?.data?.success) {
        message.success(response.data.message || "Registered successfully");
        signIn("credentials", {
          email: values.email,
          password: values.password,
          redirect: false,
        })
        router.push("/dashboard");
        return { success: true, data: response.data };
      } else {
        message.error(response?.data?.message || "Registration failed");
      }
    } catch (error: any) {
      console.error("Registration error:", error);
      const errorMessage =
        error?.response?.data?.message ||
        error.message ||
        "Registration failed. Please try again.";
      message.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return { register, isLoading };
}