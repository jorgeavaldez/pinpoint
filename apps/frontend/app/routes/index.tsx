import { SearchBoxCore } from "@mapbox/search-js-core";
import { Button } from "@/components/ui/button";
import { createFileRoute } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";

type SearchInput = {
	lat: number;
	lon: number;
};

const getLocationPoints = createServerFn({ method: "GET" })
	.validator((location: SearchInput) => location)
	.handler(async (ctx) => {
		const searchbox = new SearchBoxCore({
			accessToken:
				"pk.eyJ1IjoiZGVsdmF6ZSIsImEiOiJjbThuMWtucGgxa2YzMmxweHZrNjZuNm1sIn0.2gjk3rH2em5ha1p8Gzb5nw",
		});
		const res = await searchbox.reverse(ctx.data)
		console.dir(res)
		return res;
	});

export const Route = createFileRoute("/")({
	component: Home,
});

function Home() {
	const [coords, setCoords] = useState<GeolocationPosition | null>(null);

	const { mutate, isPending } = useMutation({
		mutationFn: () =>
			new Promise<GeolocationPosition>((resolve, reject) => {
				navigator.geolocation.getCurrentPosition(resolve, reject);
			}),
		onSuccess: (position) => setCoords(position),
		onError: (error) => console.error("Error:", error),
	});

	return (
		<main>
			<h1>Home</h1>
			<Button onClick={() => mutate()} disabled={isPending}>
				{isPending ? "Locating..." : "Get My Location"}
			</Button>
			{coords && (
				<div className="mt-4 space-y-2">
					<p>Latitude: {coords.coords.latitude.toFixed(5)}</p>
					<p>Longitude: {coords.coords.longitude.toFixed(5)}</p>
				</div>
			)}
		</main>
	);
}
