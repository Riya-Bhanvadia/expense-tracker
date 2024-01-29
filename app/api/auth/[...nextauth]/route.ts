import User from "@/models/userModel";
// import { profile } from "console";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { comparePassword } from "@/password-auth/passwordAuth";

export const authOptions: any = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {},
      async authorize(credentials) {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };
        try {
          const user = await User.findOne({ email });
          // console.log(user);

          if (!user) {
            console.log("--------");

            return null;
          }
          const matchPassword = await comparePassword(password, user.password);
          if (!matchPassword) {
            return null;
          }
          return user;
        } catch (error) {
          console.log(error);
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async signIn({ account, profile }: { account: any; profile: any }) {
      // console.log("aaaaaaaaaaa", account);
      if (account?.type === "oauth") {
        await signInWithOauth(profile, account);
      }
      // if(account?.type === "credentials")

      return true;
    },
    async jwt({ token }: { token: any }) {
      const user = await getUserByToken(token);
      token.user = user;

      // console.log("tokennnnnnnnnn", token);
      return token;
    },
    async session({ session, token }: { session: any; token: any }) {
      session.user = token.user!;
      // console.log({ session, token });
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET!,
  pages: {
    signIn: "/",
  },
};

const handlers = NextAuth(authOptions);

const signInWithOauth = async (profile: any, account: any) => {
  console.log("------------------------------");
  // console.log(profile);

  const user = await User.findOne({ email: profile.email });
  // console.log("user----------------",user);

  if (user) {
    return true;
  }
  // console.log(account.provider);

  const newUser = new User({
    name: profile.name,
    email: profile.email,
    // password: "123",
    providers: account.provider,
  });
  console.log("newUser----");
  newUser.save();
  return true;
};

const getUserByToken = async (token: any) => {
  const user = await User.findOne({ email: token.email }).select("-password");
  if (!user) throw new Error("email dosent exists");
  return { ...user._doc, _id: user._id.toString() };
};

export { handlers as GET, handlers as POST };
