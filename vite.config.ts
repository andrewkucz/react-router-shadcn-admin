import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";

export default defineConfig({
	resolve: {
		tsconfigPaths: true,
	},
	plugins: [tailwindcss(), reactRouter()],
	optimizeDeps: {
		// Better Auth ships multiple server-only adapters as transitive deps.
		// Exclude the unused Kysely adapter path from browser dep optimization.
		exclude: ["@better-auth/kysely-adapter", "kysely"],
	},
});
