// import NextAuth from "next-auth";
// import { authOptions } from "./utils/authOptions";

// export default NextAuth(authOptions).auth;

// export const config = {
//   matcher: ["/properties/add", "/profile", "/properties/saved", "/messages"],
// };

// export { default } from "next-auth/middleware";
// export const config = {
//   matcher: ["/properties/add", "/profile", "/properties/saved", "/messages"],
// };

import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function proxy(req) {
  const protectedRoutes = [
    "/properties/add",
    "/profile",
    "/properties/saved",
    "/messages",
  ];

  const isProtected = protectedRoutes.some((route) =>
    req.nextUrl.pathname.startsWith(route),
  );

  if (isProtected) {
    const token = await getToken({
      req,
      secret: process.env.NEXTAUTH_SECRET,
    });

    if (!token) {
      const loginUrl = new URL("/api/auth/signin", req.url);
      loginUrl.searchParams.set("callbackUrl", req.nextUrl.pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/properties/add/:path*",
    "/profile/:path*",
    "/properties/saved/:path*",
    "/messages/:path*",
  ],
};
