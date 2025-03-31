import { defineConfig } from "drizzle-kit";

export default defineConfig({
	out: "./drizzle",
	schema: "./src/schema/*",
	dialect: "postgresql",
	dbCredentials: {
		host: process.env.PGHOST,
		port: Number.parseInt(process.env.PGPORT),
		user: process.env.PGUSER,
		password: process.env.PGPASSWORD,
		database: process.env.PGDATABASE,
		ssl: false,
	},
});
