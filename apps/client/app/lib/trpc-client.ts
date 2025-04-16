import { createTRPCClient, httpBatchLink } from "@trpc/client";
import type { AppRouter } from "server/src/routes/_app";
import { BACKEND_URL } from "./const";

const client = createTRPCClient<AppRouter>({
	links: [
		// httpLink({
		//   url: "http://localhost:4001/trpc",
		// }),
		httpBatchLink({
			url: `${BACKEND_URL}/trpc`,
			// You can pass any HTTP headers you wish here
			// async headers() {
			//   return {
			//     authorization: getAuthCookie(),
			//   };
			// },
		}),
	],
});

export const api = client;
