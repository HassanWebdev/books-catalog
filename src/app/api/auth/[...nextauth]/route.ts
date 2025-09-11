import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;
        try {
          const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
          if (!baseUrl) {
            // Demo fallback: accept any password length >= 6
            if (credentials.password.length >= 6) {
              return { id: credentials.email, email: credentials.email } as any;
            }
            return null;
          }
          const resp = await fetch(`${baseUrl}/api/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: credentials.email, password: credentials.password }),
          });
          if (!resp.ok) return null;
          const user = await resp.json();
          return {
            id: user.id?.toString?.() ?? user.id ?? credentials.email,
            name: user.name ?? undefined,
            email: user.email ?? credentials.email,
          } as any;
        } catch {
          return null;
        }
      },
    }),
  ],
  session: { strategy: "jwt" },
  pages: { signIn: "/login" },
  debug: process.env.NODE_ENV !== "production",
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.user = user;
      return token;
    },
    async session({ session, token }) {
      if (token?.user) (session as any).user = token.user;
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };