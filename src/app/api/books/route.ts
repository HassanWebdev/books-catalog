import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/utils/db";
import { isUserAllowed, responseTransformer } from "@/utils/helperFunction";

export async function GET(request: NextRequest) {
  try {
    const { allowed, user, message } = await isUserAllowed();
    if (!allowed || !user) return responseTransformer(message, false);

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const skip = (page - 1) * limit;

    const [books, total] = await Promise.all([
      prisma.book.findMany({
        where: { userId: user.id },
        skip,
        take: limit,
        orderBy: { createdAt: "desc" },
      }),
      prisma.book.count({ where: { userId: user.id } }),
    ]);

    return responseTransformer("Books retrieved successfully", true, books, {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    return responseTransformer("Internal server error", false);
  }
}

export async function POST(request: NextRequest) {
  try {
    const { allowed, user, message } = await isUserAllowed();
    if (!allowed || !user) return responseTransformer(message, false);

    const { title, author, genre } = await request.json();

    if (!title || !author || !genre) {
      return NextResponse.json(
        { error: "Title, author, and genre are required" },
        { status: 400 }
      );
    }

    const book = await prisma.book.create({
      data: {
        title,
        author,
        genre,
        userId: user.id,
      },
    });

    return responseTransformer("Book created successfully", true, book, null);
  } catch (error) {
    return responseTransformer("Internal server error", false);
  }
}
