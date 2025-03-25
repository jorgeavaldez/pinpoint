"use client";

import type sb from "@mapbox/search-js-core";
import {
	CircleMarker,
	MapContainer,
	Marker,
	Popup,
	TileLayer,
	Tooltip,
} from "react-leaflet";

type Props = {
	coords: GeolocationPosition;
	points: sb.SearchBoxFeatureSuggestion[];
};

export default function MapGui({ coords, points }: Props) {
	return (
		<MapContainer
			center={[coords.coords.latitude, coords.coords.longitude]}
			zoom={100}
			scrollWheelZoom={true}
			className="h-full"
		>
			<TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
			<CircleMarker
				center={[coords.coords.latitude, coords.coords.longitude]}
				radius={20}
				color="red"
			>
				<Popup>Your location</Popup>
			</CircleMarker>

			{points.map((x) => (
				<Marker
					key={x.id}
					position={[x.geometry.coordinates[1], x.geometry.coordinates[0]]}
				>
					<Tooltip direction="auto" permanent>
						{x.properties.name}
					</Tooltip>
				</Marker>
			))}
		</MapContainer>
	);
}
