import { createAdminClient } from "./admin-client";

export type Subscription = {
  email: string;
  product_id: string;
  status: string;
  subscription_id: string;
  activated_at?: string;
};

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
