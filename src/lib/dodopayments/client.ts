import DodoPayments from "dodopayments";

export function createDodoPaymentsClient() {
  const client = new DodoPayments({
    bearerToken: process.env.DODO_PAYMENTS_API_KEY,
    environment: process.env.DODO_PAYMENTS_ENVIRONMENT as unknown as
      | "live_mode"
      | "test_mode",
  });
  return client;
}
