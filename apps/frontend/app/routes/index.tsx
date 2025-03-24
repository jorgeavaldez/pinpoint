import { createFileRoute } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";

const getCount = createServerFn({ method: "GET" }).handler(() => {
	return { count: 1 };
});

export const Route = createFileRoute("/")({
	component: Home,
	loader: async () => await getCount(),
});

function Home() {
	const state = Route.useLoaderData()

	return (
		<div>
			<h1>Home</h1>
			<p>Count: {state.count}</p>
		</div>
	);
}
