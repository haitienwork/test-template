import { trpcServer } from "@hono/trpc-server";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { appRouter } from "./routes/_app";
import productRoutes from "./routes/product";
const app = new Hono();

app.use(
	cors({
		// Only frontend/shopify store is allowed
		origin: ["http://localhost:3000", "https://admin.shopify.com", "https://theme-dev-hb.myshopify.com"],
	}),
);

app.route('/products', productRoutes)

app.use(
	"/trpc/*",
	trpcServer({
		router: appRouter,
	}),
);

export default app;
