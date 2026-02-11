import NextAuth from "next-auth"
import Google from "next-auth/providers/google"

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        Google({
            clientId: process.env.AUTH_GOOGLE_ID,
            clientSecret: process.env.AUTH_GOOGLE_SECRET,
        }),
    ],
    pages: {
        signIn: '/',
    },
    callbacks: {
        authorized: async ({ auth }) => {
            // Return true to allow all routes - authentication is optional
            return true
        },
    },
})
