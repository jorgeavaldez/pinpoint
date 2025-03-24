import { createFileRoute, useRouter } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";

const getCount = createServerFn({ method: "GET" }).handler(() => {
	return { count: 1 };
});

export const Route = createFileRoute("/")({
	component: Home,
	loader: async () => await getCount(),
});

function Home() {
	const router = useRouter();
	const state = Route.useLoaderData()

	return (
		<div>
			<h1>Home</h1>
			<p>Count: {state.count}</p>
		</div>
	);
}
