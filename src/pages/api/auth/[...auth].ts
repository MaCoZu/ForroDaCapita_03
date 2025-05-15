// src/pages/api/auth/[...auth].ts
import { defineConfig } from "auth-astro";
import Credentials from "@auth/core/providers/credentials";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import { MongoClient } from "mongodb";

// Setup MongoDB client for Auth.js
const client = new MongoClient(process.env.MONGODB_URI as string);
const clientPromise = client.connect();

// Auth.js configuration for Astro
export const { auth, getSession } = defineConfig({
    providers: [
        Credentials({
            name: "Credentials",
            credentials: {
                username: { label: "Username", type: "text" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                // This is where you would check the credentials against your database
                // For development purposes, you can use a simple check
                if (
                    credentials?.username === process.env.TINA_USERNAME &&
                    credentials?.password === process.env.TINA_PASSWORD
                ) {
                    return {
                        id: "1",
                        name: credentials.username,
                        email: `${credentials.username}@example.com`,
                    };
                }

                // If you have users in MongoDB, you'd check against that instead
                return null;
            }
        }),
    ],
    adapter: MongoDBAdapter(clientPromise, {
        databaseName: process.env.MONGODB_DB_NAME,
        collections: {
            Users: "users",
            Accounts: "accounts",
            Sessions: "sessions",
            VerificationTokens: "verification_tokens",
        },
    }),
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
    debug: process.env.NODE_ENV === "development",
});