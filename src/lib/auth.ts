import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { type DefaultSession } from "next-auth";
import { type JWT } from "next-auth/jwt";

const getBaseUrl = () => {
    const url = process.env.NEXT_PUBLIC_API_URL || "https://api.yupimall.net";
    return url.replace(/\/$/, "");
};

const baseUrl = getBaseUrl();

declare module "next-auth" {
    interface Session {
        accessToken?: string;
        refreshToken?: string;
        error?: string;
        user: {
            id?: string;
            role?: string;
            country?: string;
        } & DefaultSession["user"];
    }

    interface User {
        access?: string;
        refresh?: string;
        role?: string;
        country?: string;
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        accessToken?: string;
        refreshToken?: string;
        expiresAt?: number;
        error?: string;
        role?: string;
        country?: string;
    }
}

export async function refreshAccessToken(token: JWT) {
    try {
        console.log("AUTH_DEBUG: Refreshing token at", `${baseUrl}/api/v1/auth/refresh-token/`);

        const response = await fetch(`${baseUrl}/api/v1/auth/refresh-token/`, {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                refresh: token.refreshToken,
            }),
        });

        if (!response.ok) {
            throw new Error(`Refresh failed with status: ${response.status}`);
        }

        const data = await response.json();

        return {
            ...token,
            accessToken: data.access || token.accessToken,
            refreshToken: data.refresh ?? token.refreshToken,
            expiresAt: Date.now() + 30 * 24 * 60 * 60 * 1000, // 30 days
        };
    } catch (error) {
        console.error("Error refreshing access token", error);
        return {
            ...token,
            error: "RefreshAccessTokenError",
        };
    }
}

export const { handlers, auth, signIn, signOut } = NextAuth({
    providers: [
        Credentials({
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            authorize: async (credentials) => {
                try {
                    console.log("AUTH_DEBUG: Attempting signin for", credentials?.email, "at", `${baseUrl}/api/v1/auth/signin`);

                    const response = await fetch(`${baseUrl}/api/v1/auth/signin`, {
                        method: "POST",
                        headers: {
                            "Accept": "application/json",
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            username: credentials.email,
                            password: credentials.password,
                        }),
                    });

                    if (!response.ok) {
                        console.log("AUTH_DEBUG: Authentication failed - Server returned", response.status);
                        return null;
                    }

                    const data = await response.json();
                    console.log("AUTH_DEBUG: Response status:", data.status);

                    if (data.status === 200 && data.user.token) {
                        console.log("AUTH_DEBUG: User role:", data.user.role);
                        // Restriction: Only Warehouse users allowed in this panel
                        if (data.user.role !== 'warehouse') {
                            console.log("AUTH_DEBUG: Access denied - role mismatch (expected warehouse)");
                            return null;
                        }

                        console.log("AUTH_DEBUG: Authentication successful for", data.user.username);

                        return {
                            id: data.user.id.toString(),
                            name: data.user.username,
                            email: data.user.email,
                            image: data.user.image_url || data.user.avatar_url,
                            access: data.user.token,
                            refresh: data.user.token,
                            role: data.user.role,
                            country: data.user.country,
                        };
                    }
                    console.log("AUTH_DEBUG: Authentication failed - Invalid status or missing token");
                    return null;
                } catch (error: any) {
                    console.error("AUTH_DEBUG: Authorize error:", error.message);
                    return null;
                }
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user, account }) {
            if (account && user) {
                return {
                    accessToken: user.access,
                    refreshToken: user.refresh,
                    expiresAt: Date.now() + 30 * 24 * 60 * 60 * 1000, // 30 Days
                    role: user.role,
                    country: user.country,
                    image: user.image,
                    user,
                };
            }

            if (Date.now() < (token.expiresAt as number)) {
                return token;
            }

            return refreshAccessToken(token);
        },
        async session({ session, token }) {
            session.accessToken = token.accessToken as string;
            session.refreshToken = token.refreshToken as string;
            session.error = token.error as string;
            if (session.user) {
                session.user.role = token.role as string;
                session.user.country = token.country as string;
                session.user.image = token.image as string;
            }
            return session;
        },
    },
    pages: {
        signIn: "/login",
        signOut: "/logout",
    },
    session: { strategy: "jwt" },
    trustHost: true,
    secret: process.env.AUTH_SECRET || "default_landing_secret_for_build",
});


