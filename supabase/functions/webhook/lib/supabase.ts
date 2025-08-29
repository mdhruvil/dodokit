import { createClient } from "npm:@supabase/supabase-js";
import type { Database } from "../../../database.types.ts";
import type { Subscription } from "../types.ts";

export function createAdminClient() {
  const supabase = createClient<Database>(
    // both env vars will be provided by supabase functions
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
  );
  return supabase;
}

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

const supabaseAdmin = createAdminClient();

export class DB {
  static async createSubscription({
    email,
    product_id,
    status,
    subscription_id,
    activated_at,
  }: Subscription) {
    const { data, error } = await supabaseAdmin
      .from("user_subscriptions")
      .insert({
        email,
        product_id,
        status,
        subscription_id,
        activated_at,
      });
    if (error) {
      console.error("Error creating subscription:", error);
      throw new Error("Error creating subscription", { cause: error });
    }
    return data;
  }

  static async findSubscription(subscriptionId: string) {
    const { data, error } = await supabaseAdmin
      .from("user_subscriptions")
      .select("*")
      .eq("subscription_id", subscriptionId)
      .maybeSingle();
    if (error) {
      console.error("Error finding subscription:", error);
      throw new Error("Error finding subscription", { cause: error });
    }
    return data;
  }

  static async updateSubscription(id: string, data: Partial<Subscription>) {
    const { data: updatedData, error } = await supabaseAdmin
      .from("user_subscriptions")
      .update(data)
      .eq("id", id);

    if (error) {
      console.error("Error updating subscription:", error);
      throw new Error("Error updating subscription", { cause: error });
    }
    return updatedData;
  }
}
