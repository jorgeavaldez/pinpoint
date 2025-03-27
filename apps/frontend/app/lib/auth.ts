import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { passkey } from "better-auth/plugins/passkey";
import { db } from "@pinpoint/db";

export const auth = betterAuth({
	plugins: [passkey()],
	database: drizzleAdapter(db, {
		provider: "pg",
	}),
});
