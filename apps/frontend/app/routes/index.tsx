import { Button } from "@/components/ui/button";
import { createFileRoute } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';

const getCount = createServerFn({ method: "GET" }).handler(() => {
	return { count: 1 };
});

export const Route = createFileRoute("/")({
	component: Home,
	loader: async () => await getCount(),
});

function Home() {
	const state = Route.useLoaderData();
	const [coords, setCoords] = useState<GeolocationPosition | null>(null);

	const { mutate } = useMutation({
		mutationFn: () => new Promise<GeolocationPosition>((resolve, reject) => {
			navigator.geolocation.getCurrentPosition(resolve, reject);
		}),
		onSuccess: (position) => setCoords(position),
		onError: (error) => console.error('Error:', error)
	});

	return (
		<div>
			<h1>Home</h1>
			<p>Count: {state.count}</p>
			<Button onClick={() => mutate()}>Get My Location</Button>
			{coords && (
				<div className="mt-4 space-y-2">
					<p>Latitude: {coords.coords.latitude.toFixed(5)}</p>
					<p>Longitude: {coords.coords.longitude.toFixed(5)}</p>
				</div>
			)}
		</div>
	);
}
