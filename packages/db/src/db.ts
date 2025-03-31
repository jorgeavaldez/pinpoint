import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
import { schema } from "./schema";

const pool = new pg.Pool({
	host: process.env.PGHOST,
	port: Number.parseInt(process.env.PGPORT),
	user: process.env.PGUSER,
	password: process.env.PGPASSWORD,
	database: process.env.PGDATABASE,
});

export const db = drizzle({
	client: pool,
	schema,
});
