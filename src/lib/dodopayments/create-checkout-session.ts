"use server";
import type { CheckoutSessionResponse } from "dodopayments/resources.mjs";
import { createDodoPaymentsClient } from "./client";
import { createClient } from "../supabase/server";

type CreateCheckoutSessionResult =
  | {
      success: false;
      error: string;
    }
  | {
      success: true;
      data: CheckoutSessionResponse;
    };

export async function createCheckoutSession(
  product_id: string,
): Promise<CreateCheckoutSessionResult> {
  "use server";

  const supabase = await createClient();

  const { data, error } = await supabase.auth.getUser();
  if (error || !data || !data.user) {
    console.error("Failed to retrieve user", { error });
    return {
      success: false,
      error: "Failed to retrieve user",
    };
  }

  if (!data.user.email) {
    return {
      success: false,
      error: "User email is missing",
    };
  }

  const customerId = data.user.user_metadata?.customerId ?? undefined;
  try {
    const client = createDodoPaymentsClient();
    const session = await client.checkoutSessions.create({
      product_cart: [
        {
          product_id: product_id,
          quantity: 1,
        },
      ],
      customer: {
        customer_id: customerId,
        email: data.user.email,
      },
      return_url: process.env.DODO_PAYMENTS_RETURN_URL,
      allowed_payment_method_types: [
        "credit",
        "debit",
        "upi_collect",
        "upi_intent",
      ],
    });
    return {
      success: true,
      data: session,
    };
  } catch (error: unknown) {
    console.error("Failed to create checkout session", { error });
    return {
      success: false,
      error: "Failed to create checkout session",
    };
  }
}
