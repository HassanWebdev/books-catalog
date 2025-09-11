import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
	const { pathname, search } = req.nextUrl;
	const isPublicRoute =
		pathname.startsWith("/auth/signin") ||
		pathname.startsWith("/api/auth") ||
		pathname.startsWith("/_next") ||
		pathname === "/favicon.ico" ||
		pathname.startsWith("/public/") ||
		pathname === "/";

	if (isPublicRoute) return NextResponse.next();
	
	const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
	if (!token) {
		const signInUrl = new URL("/auth/signin", req.url);
		const callbackUrl = pathname + (search || "");
		signInUrl.searchParams.set("callbackUrl", callbackUrl);
		return NextResponse.redirect(signInUrl);
	}
	return NextResponse.next();
}

export const config = {
	matcher: [
		"/((?!api/auth|_next/static|_next/image|favicon.ico).*)",
	],
};

