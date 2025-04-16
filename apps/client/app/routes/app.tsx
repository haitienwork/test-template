import type {
	HeadersFunction,
	LinksFunction,
	LoaderFunctionArgs,
} from "@remix-run/node";
import { Link, Outlet, useLoaderData, useRouteError } from "@remix-run/react";
import { boundary } from "@shopify/shopify-app-remix/server";
import { AppProvider } from "@shopify/shopify-app-remix/react";
import { NavMenu } from "@shopify/app-bridge-react";
import polarisStyles from "@shopify/polaris/build/esm/styles.css?url";
import tailwindcss from "@/tailwind.css?url";
import { API_KEY } from '@/lib/const';

export const links: LinksFunction = () => [
	{ rel: "stylesheet", href: polarisStyles },
	{ rel: "stylesheet", href: tailwindcss },
];

export const loader = async ({ request }: LoaderFunctionArgs) => {
	return { apiKey: API_KEY };
};

export default function App() {
	const { apiKey } = useLoaderData<typeof loader>();

	return (
		<AppProvider isEmbeddedApp apiKey={apiKey}>
			<NavMenu>
				<Link to="/app" rel="home">
					Home
				</Link>
				<Link to="/app/additional" prefetch="intent">
					Additional page
				</Link>
				<Link to="/app/additional_2" prefetch="intent">
					Additional page 2
				</Link>
			</NavMenu>
			<Outlet />
		</AppProvider>
	);
}

// Shopify needs Remix to catch some thrown responses, so that their headers are included in the response.
export function ErrorBoundary() {
	return boundary.error(useRouteError());
}

export const headers: HeadersFunction = (headersArgs) => {
	return boundary.headers(headersArgs);
};
