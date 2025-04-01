import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { useGeolocation } from "@/lib/use-geolocation";
import { createFileRoute } from "@tanstack/react-router";
import { Suspense, lazy } from "react";

export const Route = createFileRoute("/")({
	component: Home,
});

const MapGui = lazy(() => import("@/components/map"));

function Home() {
	const {
		data: coords,
		isPending: coordsLoading,
		error: coordsError,
	} = useGeolocation();
	const { data: session, isPending: sessionIsPending } =
		authClient.useSession();

	return (
		<main className="h-screen">
			{!sessionIsPending && session ? (
				<p className="p-4 font-bold text-sm">Welcome {session.user.name}</p>
			) : (
				<p className="p-4 font-bold text-sm">
					Log in to save and view cool places near you!
				</p>
			)}

			<Suspense
				fallback={
					<div className="h-2/3 flex justify-center content-center items-center font-bold text-xl bg-gray-100">
						Loading...
					</div>
				}
			>
				{coords && (
					<div className="h-2/3">
						<MapGui coords={coords} />
					</div>
				)}
			</Suspense>

			{coords ? (
				<div className="p-4">
					<span className="font-bold text-lg">Location: </span>
					<span>
						{coords.coords.latitude.toFixed(5)},{" "}
						{coords.coords.longitude.toFixed(5)}
					</span>
				</div>
			) : coordsLoading ? (
				<div>
					<span>Loading your current location...</span>
				</div>
			) : coordsError ? (
				<span>{coordsError.message}</span>
			) : null}

			<Button>Save this Location!</Button>
		</main>
	);
}
