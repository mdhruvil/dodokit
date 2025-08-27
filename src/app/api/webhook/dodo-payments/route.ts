import { handleSubscriptionWebhook as originalHandleSubscriptionWebhook } from "@/lib/dodopayments/handle-subscription-webhook";
import { Webhooks } from "@dodopayments/nextjs";

type CommonPayloadType = {
  data: {
    customer: {
      email: string;
    };
    product_id: string;
    status: string;
    subscription_id: string;
    created_at: Date;
  };
};
// wrapper handler function to reduce the boilerplate code
async function handleSubscriptionWebhook(payload: CommonPayloadType) {
  const { data } = payload;
  await originalHandleSubscriptionWebhook({
    email: data.customer.email,
    product_id: data.product_id,
    status: data.status,
    subscription_id: data.subscription_id,
    activated_at: data.created_at.toISOString(),
  });
}

export const POST = Webhooks({
  webhookKey: process.env.DODO_PAYMENTS_WEBHOOK_KEY!,
  onPayload: async (payload) => {
    console.log("Received webhook payload:");
    console.log(JSON.stringify(payload, null, 2));
  },

  onSubscriptionActive: handleSubscriptionWebhook,
  onSubscriptionCancelled: handleSubscriptionWebhook,
  onSubscriptionExpired: handleSubscriptionWebhook,
  onSubscriptionPaused: handleSubscriptionWebhook,
  onSubscriptionFailed: handleSubscriptionWebhook,
  onSubscriptionOnHold: handleSubscriptionWebhook,
  onSubscriptionPlanChanged: handleSubscriptionWebhook,
  onSubscriptionRenewed: handleSubscriptionWebhook,
});
