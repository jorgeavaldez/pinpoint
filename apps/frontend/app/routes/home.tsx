import { Welcome } from "../welcome/welcome";

export function meta() {
	return [
		{ title: "Pinpoint" },
		{ name: "description", content: "store it now!" },
	];
}

export default function Home() {
	return <Welcome />;
}
