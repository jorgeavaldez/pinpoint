import sb from "@mapbox/search-js-core";
import { Button } from "@/components/ui/button";
import { createFileRoute } from "@tanstack/react-router";
import { createServerFn, useServerFn } from "@tanstack/react-start";
import { useQuery } from "@tanstack/react-query";
import { z } from "zod";

const SearchInputSchema = z.object({
	lat: z.number().min(-90).max(90),
	lon: z.number().min(-180).max(180),
});

const getLocationPoints = createServerFn({ method: "GET" })
	.validator((input: unknown) => {
		return SearchInputSchema.parse(input);
	})
	.handler(async (ctx) => {
		const searchbox = new sb.SearchBoxCore({
			accessToken:
				"pk.eyJ1IjoiZGVsdmF6ZSIsImEiOiJjbThuMWtucGgxa2YzMmxweHZrNjZuNm1sIn0.2gjk3rH2em5ha1p8Gzb5nw",
		});
		try {
			const res = await searchbox.reverse(ctx.data);
			return res;
		} catch (error) {
			console.error("SearchBox API Error:", error);
			throw new Error("Failed to fetch location data");
		}
	});

export const Route = createFileRoute("/")({
	component: Home,
});

function Home() {
	const getLocPoints = useServerFn(getLocationPoints);
	const {
		data: coords,
		isLoading: isCoordsLoading,
		refetch: fetchCoords,
	} = useQuery({
		enabled: false,
		queryKey: ["coords"],
		queryFn: () =>
			new Promise<GeolocationPosition>((resolve, reject) => {
				navigator.geolocation.getCurrentPosition(resolve, reject);
			}),
	});

	const {
		data: points,
		isLoading: isPointsLoading,
		refetch: fetchPoints,
	} = useQuery({
		enabled: false,
		queryKey: ["points", coords?.coords.latitude, coords?.coords.longitude],
		queryFn: () =>
			getLocPoints({
				data: {
					lat: coords?.coords.latitude,
					lon: coords?.coords.longitude,
				},
			}),
	});

	return (
		<main>
			<h1>Home</h1>
			<Button
				onClick={() => fetchCoords()}
				disabled={isCoordsLoading}
				type="button"
			>
				{isCoordsLoading ? "Locating..." : "Get My Location"}
			</Button>

			<Button
				onClick={() => fetchPoints()}
				disabled={isPointsLoading && !coords}
				type="button"
			>
				{isPointsLoading ? "fetching points..." : "Get points"}
			</Button>

			{coords && (
				<pre className="mt-4 space-y-2">
					<p>Latitude: {coords.coords.latitude.toFixed(5)}</p>
					<p>Longitude: {coords.coords.longitude.toFixed(5)}</p>
				</pre>
			)}

			{points && <pre>{JSON.stringify(points, null, 2)}</pre>}
		</main>
	);
}
