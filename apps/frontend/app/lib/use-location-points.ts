import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useGeolocation } from "./use-geolocation";
import { getLocationPoints } from "./server-functions/get-location-points";

export function useLocationPoints() {
	const { data: coords } = useGeolocation();
	const getLocPoints = useServerFn(getLocationPoints);

	return useQuery({
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
}
