import { Webhook } from "npm:standardwebhooks";
import type DodoPayments from "npm:dodopayments";
import { handleSubscriptionWebhook } from "./lib/supabase.ts";
// Setup type definitions for built-in Supabase Runtime APIs
import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const webhook = new Webhook(Deno.env.get("DODO_PAYMENTS_WEBHOOK_KEY")!);

// I am refering this https://docs.dodopayments.com/developer-resources/webhooks
Deno.serve(async (req) => {
  const textBody = await req.text();
  const webhookId = req.headers.get("webhook-id");
  const webhookSig = req.headers.get("webhook-signature");
  const webhookTimestamp = req.headers.get("webhook-timestamp");

  if (!webhookId || !webhookSig || !webhookTimestamp) {
    return new Response("Missing required headers", { status: 400 });
  }

  let samePayloadOutput;
  try {
    samePayloadOutput = await webhook.verify(textBody, {
      "webhook-id": webhookId,
      "webhook-signature": webhookSig,
      "webhook-timestamp": webhookTimestamp,
    });
    if (!samePayloadOutput) {
      return new Response("Invalid payload", { status: 400 });
    }
  } catch {
    return new Response("No matching signature found", { status: 401 });
  }

  const payload = samePayloadOutput as unknown as DodoPayments.WebhookPayload;

  const { data } = payload;
  const isSubscriptionWebhook = payload.type.startsWith("subscription.");
  if (!isSubscriptionWebhook || data.payload_type !== "Subscription") {
    // ignore webhooks which are not subscription
    return new Response("ok");
  }
  console.log("Received subscription webhook:", payload.type);
  await handleSubscriptionWebhook({
    email: data.customer.email,
    product_id: data.product_id,
    status: data.status,
    subscription_id: data.subscription_id,
    activated_at: new Date(data.created_at).toISOString(),
  });

  return new Response("ok");
});

/* To invoke locally:

  1. Run `supabase start` (see: https://supabase.com/docs/reference/cli/supabase-start)
  2. Make an HTTP request:

  curl -i --location --request POST 'http://127.0.0.1:54321/functions/v1/webhook' \
    --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0' \
    --header 'Content-Type: application/json' \
    --data '{"name":"Functions"}'

*/
