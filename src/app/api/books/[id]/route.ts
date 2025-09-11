import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/utils/db";
import { isUserAllowed } from "@/utils/helperFunction";
import { responseTransformer } from "@/utils/helperFunction";

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { allowed, user, response } = await isUserAllowed();
    if (!allowed) return response;

    if (!params.id) {
      return responseTransformer("Book ID is required", false);
    }
   
    const book = await prisma.book.findFirst({
      where: {
        id: params.id,
        userId: user.id,
      },
    });

    if (!book) {
      return responseTransformer("Book not found", false);
    }

    await prisma.book.delete({
      where: { id: params.id },
    });

    return responseTransformer("Book deleted successfully", true);
  } catch (error) {
    return responseTransformer("Internal server error", false);
  }
}
