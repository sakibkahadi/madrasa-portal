// lib/auth.js
import CredentialsProvider from "next-auth/providers/credentials";

const authOptions = {
  pages: {
  signIn: "/(auth)/login",
  },
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60, // 24 hours
    updateAge: 60 * 60,   // 1 hour
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.access_token;
        token.user = user.data;
        token.accessTokenExpires = user.expires_at || Date.now() + 24 * 60 * 60 * 1000;
      }
      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken;
      session.user = token.user;
      session.error = token.error;
      return session;
    },
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
     async authorize(credentials) {
  try {
    console.log('before')
    const response = await fetch("https://tpnl.lamptechs.com/api/v1/university/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });
console.log('after')
    const data = await response.json();
    console.log("Login response:", data); // 🔍 Check this in terminal

    if (data.status === true && data.data && data.access_token) {
      return {
        access_token: data.access_token,
        data: data.data,
        expires_at: data.expires_at || null,
      };
    }

    return null;
  } catch (error) {
    console.error("Authorize error:", error);
    return null;
  }
}

    }),
  ],
};

export default authOptions;
