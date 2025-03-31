import { defineConfig } from "@tanstack/react-start/config";
// import basicSsl from "@vitejs/plugin-basic-ssl";
import tsConfigPaths from "vite-tsconfig-paths";

export default defineConfig({
	server: {
		preset: "bun",
		// https: true,
	},
	vite: {
		plugins: [
			// basicSsl({
			// 	name: "pinpoint",
			// 	domains: ["*.valdez.house"],
			// }),
			tsConfigPaths({
				projects: ["./tsconfig.json"],
			}),
		],
	},
});
