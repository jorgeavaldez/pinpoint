import { schema, db } from "@pinpoint/db";
import { auth } from "@/lib/auth";
import { z } from "zod";
import { json } from "@tanstack/react-start";
import { createAPIFileRoute } from "@tanstack/react-start/api";

const LocationSchema = z.object({
	lat: z.string(),
	lon: z.string(),
});

export const APIRoute = createAPIFileRoute("/api/locations/store")({
	POST: async ({ request }) => {
		const session = await auth.api.getSession({
			headers: request.headers,
		});

		if (!session?.user.id) {
			return new Response("Unauthorized", { status: 401 });
		}

		const data = await request.json();

		const {
			success,
			data: location,
			error,
		} = await LocationSchema.safeParseAsync(data);

		if (!success && error) {
			return new Response(error.message, { status: 400 });
		}

		if (!success) {
			return new Response("Invalid data", { status: 400 });
		}

		const [dbLocation] = await db
			.insert(schema.location)
			.values({
				lat: location.lat,
				lon: location.lon,
				user: session.user.id,
			})
			.returning({
				lat: schema.location.lat,
				lon: schema.location.lon,
				id: schema.location.id,
			});

		return json({ location: dbLocation });
	},
});
