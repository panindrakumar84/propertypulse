import { connectDB } from "@/config/database";
import User from "@/models/user";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  callbacks: {
    // invoked on successful sign fin
    async signIn({ profile }) {
      /*
      1. connect to the database
      2. check if user exists
      3, if not, create user,
      4. return true to allow sign in
      */
      await connectDB();
      const userExists = await User.findOne({ email: profile.email });
      if (!userExists) {
        const username = profile.name.slice(0, 20);
        await User.create({
          email: profile.email,
          username,
          image: profile.picture,
        });
      }

      return true;
    },
    // session callback function that modifies the session object
    async session({ session }) {
      // 1. get user from database
      const user = await User.findOne({ email: session.user.email });

      // 2. assign user if from the session
      session.user.id = user._id.toString();
      // 3. return session
      return session;
    },
  },
};
