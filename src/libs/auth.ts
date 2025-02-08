import NextAuth from "next-auth";

import SpotifyProvider from "next-auth/providers/spotify";

export const { auth, handlers, signIn, signOut } = NextAuth({
  providers: [
    SpotifyProvider({
      clientId: process.env.SPOTIFY_CLIENT_ID,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
    }),
  ],
});
