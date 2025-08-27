import { DB, type Subscription } from "../supabase/db";

export async function handleSubscriptionWebhook({
  email,
  product_id,
  status,
  subscription_id,
  activated_at,
}: Subscription) {
  const subscription = await DB.findSubscription(subscription_id);

  if (subscription) {
    await DB.updateSubscription(subscription.id, { status });
  } else {
    await DB.createSubscription({
      email,
      product_id,
      status,
      subscription_id,
      activated_at,
    });
  }
}
