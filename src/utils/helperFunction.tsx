import { getServerSession } from "next-auth/next";
import { NextResponse } from "next/server";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/utils/db";

export async function isUserAllowed() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return {
        allowed: false,
        response: responseTransformer("Unauthorized", false),
        user: null,
      };
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return {
        allowed: false,
        response: responseTransformer("User not found", false),
        user: null,
      };
    }

    return { allowed: true, user, response: null };
  } catch (error) {
    return {
      allowed: false,
      response: responseTransformer("Internal server error", false),
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
  return NextResponse.json(
    {
      message,
      success,
      data: data ?? null,
      pagination: pagination ?? null,
      info: { ...(otherInfo ?? null) },
    },
    { status: success ? 200 : 400 }
  );
}
