import { pgTable, uuid, numeric, timestamp, text } from "drizzle-orm/pg-core";
import { v7 as uuidv7 } from "uuid";

export const location = pgTable("locations", {
	id: uuid()
		.primaryKey()
		.$default(() => uuidv7()),
	lat: numeric({ precision: 10, scale: 6 }).notNull(),
	lon: numeric({ precision: 10, scale: 6 }).notNull(),
	createdAt: timestamp().notNull().defaultNow(),
});

export const pois = pgTable("pois", {
	id: uuid()
		.primaryKey()
		.$default(() => uuidv7()),
	name: text().notNull(),
	address: text().notNull(),
	placeFormatted: text().notNull(),
	website: text(),
	phone: text(),
});
