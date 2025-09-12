import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/utils/db";
import bcrypt from "bcryptjs";
import { responseTransformer } from "@/utils/helperFunction";

export async function POST(request: NextRequest) {
  try {
    const { email, password, name } = await request.json();

    if (!email || !password) {
      return responseTransformer("Email and password are required", false);
    }

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return responseTransformer("User already exists with this email", false);
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name: name || null,
      },
    });

    return responseTransformer("User created successfully", true, {
      id: user.id,
      email: user.email,
      name: user.name,
      credentials: { email, password } 
    });
  } catch (error) {
    console.error("Registration error:", error);
    return responseTransformer("Internal server error", false);
  }
}
