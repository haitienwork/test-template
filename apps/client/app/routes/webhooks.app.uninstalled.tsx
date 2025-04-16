import type { ActionFunctionArgs } from "@remix-run/node";

export const action = async ({ request }: ActionFunctionArgs) => {
  console.log("Received app uninstalled webhook");

  return new Response();
};
