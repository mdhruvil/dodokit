"use server";
import { createClient } from "../supabase/server";
import { createDodoPaymentsClient } from "./client";

type CreateUserResult =
  | {
      success: false;
      error: string;
    }
  | {
      success: true;
      data: {
        customerId: string;
        email: string;
      };
    };

export async function createUser(): Promise<CreateUserResult> {
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

  try {
    const client = createDodoPaymentsClient();
    const customer = await client.customers.create({
      email: data.user.email,
      name: data.user.email,
    });

    await supabase.auth.updateUser({
      data: { customerId: customer.customer_id },
    });
    return {
      success: true,
      data: {
        customerId: customer.customer_id,
        email: data.user.email,
      },
    };
  } catch (error: unknown) {
    console.error("Failed to create customer in DodoPayments", { error });
    return {
      success: false,
      error: "Failed to create customer in payment processor",
    };
  }
}
