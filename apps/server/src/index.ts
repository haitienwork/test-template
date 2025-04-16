import { trpcServer } from "@hono/trpc-server";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { appRouter } from "./routes/_app";

const app = new Hono();

app.use(
	cors({
		// Only frontend is allowed
		origin: ["http://localhost:3000"],
	}),
);

app.use(
	"/trpc/*",
	trpcServer({
		router: appRouter,
	}),
);

export default app;
