import { createServerFn } from "@tanstack/react-start";
import { SearchInputSchema, searchPOIs } from "@/lib/search-pois";

export const getLocationPoints = createServerFn({ method: "GET" })
	.validator((input: unknown) => SearchInputSchema.parse(input))
	.handler((ctx) => searchPOIs(ctx.data));
