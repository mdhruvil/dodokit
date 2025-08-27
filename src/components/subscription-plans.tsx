"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { createCheckoutSession } from "@/lib/dodopayments/create-checkout-session";
import { SubscriptionPlan } from "@/lib/supabase/get-user-subscription";
import { CheckIcon } from "lucide-react";
import { useState } from "react";
import { Badge } from "./ui/badge";
import { cn } from "@/lib/utils";

interface SubscriptionPlansProps {
  availablePlans: SubscriptionPlan[];
}

export function SubscriptionPlans({ availablePlans }: SubscriptionPlansProps) {
  const [loading, setLoading] = useState<string | null>(null);

  const handleUpgrade = async (productId: string) => {
    if (!productId || productId === "free") return;

    setLoading(productId);
    try {
      const result = await createCheckoutSession(productId);
      if (!result.success) {
        throw new Error(result.error);
      }
      window.location.href = result.data.checkout_url;
    } catch (error) {
      console.error("Failed to create checkout session:", error);
      alert("Failed to create checkout session. Please try again.");
    } finally {
      setLoading(null);
    }
  };

  const getPlanFeatures = (planId: string) => {
    if (planId === "free") {
      return [
        "Basic features",
        "Limited usage",
        "Community support",
        "Simple analytics",
        "Default integrations",
      ];
    }
    return [
      "All basic features",
      "Unlimited usage",
      "Priority support",
      "Advanced analytics",
      "Custom integrations",
    ];
  };

  return (
    <div className="mx-auto w-full max-w-4xl">
      <div className="mb-8 text-center">
        <h2 className="mb-2 text-3xl font-bold">Choose Your Plan</h2>
        <p className="text-muted-foreground">
          Current plan:{" "}
          <span className="text-primary font-semibold">
            {availablePlans.find((plan) => plan.isActive)?.name}
          </span>
        </p>
      </div>

      <div className="flex flex-col gap-4 md:flex-row">
        {availablePlans.map((plan) => (
          <Card key={plan.productId} className="grow">
            <CardHeader className="text-center">
              <CardTitle className="text-xl">{plan.name}</CardTitle>
              <CardDescription>
                <span className="text-foreground text-3xl font-bold">
                  ₹{plan.price}
                </span>
                {plan.price > 0 && (
                  <span className="text-muted-foreground text-sm">
                    /{plan.interval}
                  </span>
                )}
              </CardDescription>
            </CardHeader>
            {plan.isActive ? (
              <Badge
                className={cn("mx-auto", {
                  "opacity-0": !plan.isActive,
                })}
                variant="secondary"
              >
                Current Plan
              </Badge>
            ) : (
              <div className="h-5"></div>
            )}
            <CardContent className="space-y-4">
              <ul className="space-y-2">
                {getPlanFeatures(plan.productId).map((feature, index) => (
                  <li key={index} className="flex items-center gap-2 text-sm">
                    <CheckIcon className="text-primary h-4 w-4 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>

              <Button
                onClick={() => plan.productId && handleUpgrade(plan.productId)}
                disabled={
                  plan.isActive || loading === plan.productId || !plan.productId
                }
                className="w-full"
                variant={plan.isActive ? "secondary" : "default"}
              >
                {loading === plan.productId
                  ? "Processing..."
                  : plan.isActive
                    ? "Current Plan"
                    : plan.productId === "free"
                      ? "Free Plan"
                      : "Upgrade"}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
