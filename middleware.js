import NextAuth from "next-auth";
import { authOptions } from "./utils/authOptions";

export default NextAuth(authOptions).auth;

export const config = {
  matcher: ["/properties/add", "/profile", "/properties/saved", "/messages"],
};
