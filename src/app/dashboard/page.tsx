import Link from "next/link";
import { redirect } from "next/navigation";

import { LogoutButton } from "@/components/logout-button";
import { Button } from "@/components/ui/button";
import { getUserSubscription as getUserSubscriptionPlans } from "@/lib/supabase/get-user-subscription";
import { createClient } from "@/lib/supabase/server";
import { SubscriptionPlans } from "@/components/subscription-plans";

export default async function DashboardPage() {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getUser();

  if (error || !data?.user || !data.user.email) {
    redirect("/auth/login");
  }

  const plans = await getUserSubscriptionPlans(data.user.email);
  const customerId = data.user.user_metadata?.customerId ?? undefined;

  return (
    <div className="bg-background min-h-screen">
      <header className="bg-card/30 supports-[backdrop-filter]:bg-card/50 border-b backdrop-blur">
        <div className="container mx-auto flex flex-col gap-4 px-4 py-8 md:flex-row md:items-center md:justify-between">
          <div className="space-y-1">
            <h1 className="text-3xl font-semibold tracking-tight">Dashboard</h1>
            <p className="text-muted-foreground text-sm">
              Signed in as{" "}
              <span className="font-medium">{data.user.email}</span>
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            {customerId && (
              <Button asChild variant="outline" size="sm">
                <Link href={`/customer-portal?customer_id=${customerId}`}>
                  Customer Portal
                </Link>
              </Button>
            )}
            <LogoutButton />
          </div>
        </div>
      </header>
      <div className="mt-10">
        <SubscriptionPlans availablePlans={plans} />
      </div>
    </div>
  );
}
