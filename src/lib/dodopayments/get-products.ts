import { createDodoPaymentsClient } from "./client";

export async function getProducts() {
  const client = createDodoPaymentsClient();
  // TODO: implement pagination
  const { items } = await client.products.list();
  return items;
}
