import { Link, Phone } from "lucide-react";
import type { POI } from "@/lib/search-pois";

type Props = {
	points: POI[];
};
export function PoiList({ points }: Props) {
	return (
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
	);
}
