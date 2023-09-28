import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import { err } from "pino-std-serializers";

const handler = NextAuth({
  providers: [
    GithubProvider({
      clientId: "485e43506fbb5aa04d09",
      clientSecret: "c72469946a1dd8266c8c3b21da0c936a5b34457f",
    }),
  ],
  callbacks: {
    async session({ session, user, token }) {
      return session
    },
    async signIn({ user, account, profile, email, credentials }) {
      if (account?.provider === "github" && profile?.email) {
        const exist = fetch(
          "http://localhost:2000/user/email/" + profile?.email
        )
          .then((response) => response.json())
          .catch((error) => 
            console.log("error", error)
          );
          if (exist != null) {
            return '/onboarding'
          }
          return '/onboarding'

      }
      return true;
    },
  },
});

export { handler as GET, handler as POST };
