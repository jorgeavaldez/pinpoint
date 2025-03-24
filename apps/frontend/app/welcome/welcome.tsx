import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

const getGeolocation = (): Promise<GeolocationCoordinates> => {
	return new Promise((resolve, reject) => {
		if (!navigator.geolocation) {
			reject(new Error("Geolocation is not supported by your browser"));
			return;
		}

		navigator.geolocation.getCurrentPosition(
			(position) => resolve(position.coords),
			(error) => reject(error),
		);
	});
};

export function Welcome() {
	const [shouldFetch, setShouldFetch] = useState(false);

	const {
		data: location,
		error,
		isLoading,
		isFetching,
	} = useQuery({
		queryKey: ["geolocation"],
		queryFn: getGeolocation,
		enabled: shouldFetch,
		staleTime: Number.POSITIVE_INFINITY,
		retry: false,
	});

	const handleGetLocation = () => {
		setShouldFetch(true);
	};

	const errorMessage = error ? "Unable to retrieve your location" : null;

	return (
		<main className="flex items-center justify-center pt-16 pb-4">
			<div className="flex-1 flex flex-col items-center gap-16 min-h-0">
				<header className="flex flex-col items-center gap-9">
					<h1 className="text-3xl font-bold text-center">
						Welcome to Pinpoint!
					</h1>
				</header>
				<div className="max-w-[300px] w-full space-y-6 px-4">
					<nav className="rounded-3xl border border-gray-200 p-6 dark:border-gray-700 space-y-4">
						<button
							type="button"
							onClick={handleGetLocation}
							disabled={isLoading || isFetching}
							className={`w-full px-4 py-2 text-white rounded-lg transition-colors ${
								isLoading || isFetching
									? "bg-blue-400 cursor-wait"
									: "bg-blue-500 hover:bg-blue-600"
							}`}
						>
							{isLoading || isFetching
								? "Fetching Location..."
								: "Get My Location"}
						</button>
						{(isLoading || isFetching) && (
							<p className="text-center text-sm text-gray-600 dark:text-gray-300 animate-pulse">
								Waiting for location...
							</p>
						)}
						{location && (
							<p className="text-center text-sm text-gray-600 dark:text-gray-300">
								Latitude: {location.latitude.toFixed(4)}
								<br />
								Longitude: {location.longitude.toFixed(4)}
							</p>
						)}
						{errorMessage && (
							<p className="text-center text-sm text-red-500 dark:text-red-400">
								{errorMessage}
							</p>
						)}
					</nav>
				</div>
			</div>
		</main>
	);
}
