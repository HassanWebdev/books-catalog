import { getServerSession } from "next-auth/next";
import { NextResponse } from "next/server";
import { authOptions } from "../lib/auth";
import { prisma } from "@/utils/db";

export async function isUserAllowed() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return {
        allowed: false,
        message: "Unauthorized",
        user: null,
      };
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return {
        allowed: false,
        message: "User not found",
        user: null,
      };
    }

    return { allowed: true, user, message: "Success" };
  } catch (error) {
    return {
      allowed: false,
      message: "Internal server error",
      user: null,
    };
  }
}

export async function responseTransformer(
  message: string,
  success: boolean,
  data?: any,
  pagination?: any,
  otherInfo?: any
) {
  const response: {
    message: string;
    success: boolean;
    data: any;
    pagination?: any;
    info?: any;
  } = {
    message,
    success,
    data: data ?? null,
  };

  if (pagination) {
    response.pagination = pagination;
  }

  if (otherInfo && Object.keys(otherInfo).length > 0) {
    response.info = otherInfo;
  }

  return NextResponse.json(response, { status: success ? 200 : 400 });
}
