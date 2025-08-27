import { getProducts } from "@/lib/dodopayments/get-products";
import { createClient } from "@/lib/supabase/server";
import { Price } from "dodopayments/src/resources.js";

export type SubscriptionPlan = {
  name: string;
  price: number;
  currency: string;
  interval: string;
  isActive: boolean;
  productId: string;
};

export async function getUserSubscription(
  userEmail: string,
): Promise<SubscriptionPlan[]> {
  const supabase = await createClient();

  const products = await getProducts();

  const { data: subscription } = await supabase
    .from("user_subscriptions")
    .select("*")
    .eq("email", userEmail)
    .eq("status", "active")
    .maybeSingle();

  const availablePlans: SubscriptionPlan[] = products.map((product) => {
    const priceDetail = product.price_detail as unknown as Price.RecurringPrice;
    const isActive = subscription?.product_id === product.product_id;
    return {
      currency: priceDetail.currency || "INR",
      interval: priceDetail.payment_frequency_interval || "Month",
      isActive,
      name: product.name ?? "DodoKit Pro",
      price: priceDetail.price / 100 || 0,
      productId: product.product_id,
    };
  });

  // Add Free plan
  const freePlan: SubscriptionPlan = {
    name: "Free Plan",
    price: 0,
    currency: "INR",
    interval: "month",
    isActive: !subscription,
    productId: "free",
  };

  return [freePlan, ...availablePlans];
}
