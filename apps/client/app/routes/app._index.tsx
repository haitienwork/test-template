import { useEffect } from "react";
import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { useFetcher } from "@remix-run/react";
import {
	Layout,
	Text,
	Card,
	Button,
	BlockStack,
	List,
	Link,
	InlineStack,
} from "@shopify/polaris";
import { TitleBar, useAppBridge } from "@shopify/app-bridge-react";
import { api } from "@/lib/trpc-client";

export const loader = async ({ request }: LoaderFunctionArgs) => {
	return null;
};

export const action = async ({ request }: ActionFunctionArgs) => {
	const res = await api.userList.query();
	return res;
};

export default function Index() {
	const fetcher = useFetcher<typeof action>();

	const shopify = useAppBridge();
	const isLoading =
		["loading", "submitting"].includes(fetcher.state) &&
		fetcher.formMethod === "POST";

	useEffect(() => {
		if (!shopify) return;

		if (fetcher.data) {
			const data = JSON.stringify(fetcher.data);
			shopify.toast.show(`Data Fetched from tRPC: ${data}`);
		}
	}, [fetcher.data, shopify]);
	const generateProduct = () => fetcher.submit({}, { method: "POST" });

	return (
		<div>
			<TitleBar title="Remix app template">
				<button type="button" variant="primary" onClick={generateProduct} disabled={fetcher.state === 'submitting'}>
					Generate a product
				</button>
			</TitleBar>
			<BlockStack gap="500">
				<Layout>
					<Layout.Section>
						<Card>
							<BlockStack gap="500">
								<BlockStack gap="200">
									<Text as="h2" variant="headingMd">
										Congrats on creating a new Shopify app 🎉
									</Text>
									<Text variant="bodyMd" as="p">
										This embedded app template uses{" "}
										<Link
											url="https://shopify.dev/docs/apps/tools/app-bridge"
											target="_blank"
											removeUnderline
										>
											App Bridge
										</Link>{" "}
										interface examples like an{" "}
										<Link url="/app/additional" removeUnderline>
											additional page in the app nav
										</Link>
										, as well as an{" "}
										<Link
											url="https://shopify.dev/docs/api/admin-graphql"
											target="_blank"
											removeUnderline
										>
											Admin GraphQL
										</Link>{" "}
										mutation demo, to provide a starting point for app
										development.
									</Text>
								</BlockStack>
								<BlockStack gap="200">
									<Text as="h3" variant="headingMd">
										Get started with products
									</Text>
									<Text as="p" variant="bodyMd">
										that product. Learn more about the{" "}
										<Link
											url="https://shopify.dev/docs/api/admin-graphql/latest/mutations/productCreate"
											target="_blank"
											removeUnderline
										>
											productCreate
										</Link>{" "}
										mutation in our API references.
									</Text>
								</BlockStack>
								<InlineStack gap="300">
									<Button loading={isLoading} onClick={generateProduct}>
										Generate a product
									</Button>
								</InlineStack>
							</BlockStack>
						</Card>
					</Layout.Section>
					<Layout.Section variant="oneThird">
						<BlockStack gap="500">
							<Card>
								<BlockStack gap="200">
									<Text as="h2" variant="headingMd">
										App template specs
									</Text>
									<BlockStack gap="200">
										<InlineStack align="space-between">
											<Text as="span" variant="bodyMd">
												Framework
											</Text>
											<Link
												url="https://remix.run"
												target="_blank"
												removeUnderline
											>
												Remix
											</Link>
										</InlineStack>
										<InlineStack align="space-between">
											<Text as="span" variant="bodyMd">
												Database
											</Text>
											<Link
												url="https://www.prisma.io/"
												target="_blank"
												removeUnderline
											>
												Prisma
											</Link>
										</InlineStack>
										<InlineStack align="space-between">
											<Text as="span" variant="bodyMd">
												Interface
											</Text>
											<span>
												<Link
													url="https://polaris.shopify.com"
													target="_blank"
													removeUnderline
												>
													Polaris
												</Link>
												{", "}
												<Link
													url="https://shopify.dev/docs/apps/tools/app-bridge"
													target="_blank"
													removeUnderline
												>
													App Bridge
												</Link>
											</span>
										</InlineStack>
										<InlineStack align="space-between">
											<Text as="span" variant="bodyMd">
												API
											</Text>
											<Link
												url="https://shopify.dev/docs/api/admin-graphql"
												target="_blank"
												removeUnderline
											>
												GraphQL API
											</Link>
										</InlineStack>
									</BlockStack>
								</BlockStack>
							</Card>
							<Card>
								<BlockStack gap="200">
									<Text as="h2" variant="headingMd">
										Next steps
									</Text>
									<List>
										<List.Item>
											Build an{" "}
											<Link
												url="https://shopify.dev/docs/apps/getting-started/build-app-example"
												target="_blank"
												removeUnderline
											>
												{" "}
												example app
											</Link>{" "}
											to get started
										</List.Item>
										<List.Item>
											Explore Shopify’s API with{" "}
											<Link
												url="https://shopify.dev/docs/apps/tools/graphiql-admin-api"
												target="_blank"
												removeUnderline
											>
												GraphiQL
											</Link>
										</List.Item>
									</List>
								</BlockStack>
							</Card>
						</BlockStack>
					</Layout.Section>
				</Layout>
			</BlockStack>
		</div>
	);
}
