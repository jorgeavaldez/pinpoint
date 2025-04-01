import sb from "@mapbox/search-js-core";
import { z } from "zod";

export const SearchInputSchema = z.object({
	lat: z.number().min(-90).max(90),
	lon: z.number().min(-180).max(180),
});

export async function searchPOIs(data: z.infer<typeof SearchInputSchema>) {
	const searchbox = new sb.SearchBoxCore({
		accessToken:
			"pk.eyJ1IjoiZGVsdmF6ZSIsImEiOiJjbThuMWtucGgxa2YzMmxweHZrNjZuNm1sIn0.2gjk3rH2em5ha1p8Gzb5nw",
	});
	try {
		const res = await searchbox.reverse(`${data.lon},${data.lat}`);
		const pois = res.features.filter(
			(x) => x.properties.feature_type === "poi",
		);
		return pois;
	} catch (error) {
		console.error("SearchBox API Error:", error);
		throw new Error("Failed to fetch location data");
	}
}

export type POI = sb.SearchBoxFeatureSuggestion;
