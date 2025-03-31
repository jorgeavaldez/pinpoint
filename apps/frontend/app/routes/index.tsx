import { authClient } from "@/lib/auth-client";
import sb from "@mapbox/search-js-core";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { createServerFn, useServerFn } from "@tanstack/react-start";
import { Link, Phone } from "lucide-react";
import { Suspense, lazy } from "react";
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
			const res = await searchbox.reverse(`${ctx.data.lon},${ctx.data.lat}`);
			const pois = res.features.filter(
				(x) => x.properties.feature_type === "poi",
			);
			return pois;
		} catch (error) {
			console.error("SearchBox API Error:", error);
			throw new Error("Failed to fetch location data");
		}
	});

export const Route = createFileRoute("/")({
	component: Home,
});

const MapGui = lazy(() => import("@/components/map"));

/*
 *
 *28.03 82.30
 *
 */

function Home() {
	const { data: session, isPending: sessionIsPending } =
		authClient.useSession();
	const getLocPoints = useServerFn(getLocationPoints);
	const { data: coords } = useQuery({
		queryKey: ["coords"],
		queryFn: () =>
			new Promise<GeolocationPosition>((resolve, reject) => {
				navigator.geolocation.getCurrentPosition(resolve, reject);
			}),
	});

	const { data: points } = useQuery({
		enabled: !!coords,
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
		<main className="h-screen">
			<Suspense fallback={<div>Loading...</div>}>
				{!sessionIsPending && session && <p className="p-4 font-bold text-sm">Welcome {session.user.name}</p>}
			</Suspense>
			<Suspense fallback={<div>Loading...</div>}>
				{coords && points && (
					<div className="h-2/3">
						<MapGui coords={coords} points={points} />
					</div>
				)}
			</Suspense>
			{coords && (
				<div className="p-4">
					<span className="font-bold text-lg">Location: </span>
					<span>
						{coords.coords.latitude.toFixed(5)},{" "}
						{coords.coords.longitude.toFixed(5)}
					</span>
				</div>
			)}

			<ul>
				{points?.map((x) => (
					<li className="border border-gray-200 p-4 flex flex-col" key={x.id}>
						<p className="font-bold text-lg">{x.properties.name}</p>
						<div className="flex flex-col gap-1 mb-2">
							<div className="flex flex-col">
								<p>{x.properties.address}</p>
								<p>{x.properties.place_formatted}</p>
							</div>
							<div className="flex flex-row gap-8">
								{"website" in x.properties.metadata && (
									<p>
										<Link className="inline-block mr-2" size={16} />
										<a
											href={x.properties.metadata.website}
											target="_blank"
											rel="noreferrer"
											className="underline text-primary"
										>
											{x.properties.metadata.website}
										</a>
									</p>
								)}
								{"phone" in x.properties.metadata && (
									<p>
										<Phone className="inline-block mr-2" size={16} />
										<a
											href={`tel:${x.properties.metadata.phone}`}
											type="tel"
											target="_blank"
											rel="noreferrer"
											className="underline text-primary"
										>
											{x.properties.metadata.phone}
										</a>
									</p>
								)}
							</div>
						</div>
					</li>
				))}
			</ul>
		</main>
	);
}
