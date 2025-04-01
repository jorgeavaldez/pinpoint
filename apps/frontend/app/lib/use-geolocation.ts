import { useQuery } from "@tanstack/react-query";

export function useGeolocation() {
	return useQuery({
		queryKey: ["coords"],
		queryFn: () =>
			new Promise<GeolocationPosition>((resolve, reject) => {
				navigator.geolocation.getCurrentPosition(resolve, reject, {
					enableHighAccuracy: true,
					timeout: 5000,
					// maximumAge: Number.POSITIVE_INFINITY,
					maximumAge: 0,
				});
			}),
	});
}
