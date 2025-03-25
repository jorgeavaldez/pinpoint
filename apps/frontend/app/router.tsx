import { QueryClient } from "@tanstack/react-query";
import { createRouter as createTSRouter } from "@tanstack/react-router";
import { routerWithQueryClient } from "@tanstack/react-router-with-query";
import { routeTree } from "./routeTree.gen";

export function createRouter() {
	const queryClient = new QueryClient();
	const router = createTSRouter({
		routeTree,
		context: { queryClient },
		defaultPreload: "intent",
		defaultErrorComponent: () => <h1>Ooops</h1>,
		defaultNotFoundComponent: () => <h1>Not Found</h1>,
		scrollRestoration: true,
	});

	return routerWithQueryClient(router, queryClient);
}

declare module "@tanstack/react-router" {
	interface Register {
		router: ReturnType<typeof createRouter>;
	}
}
