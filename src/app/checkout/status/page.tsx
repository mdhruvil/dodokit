"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function CheckoutStatusPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [timeLeft, setTimeLeft] = useState(3);

  const subscriptionId = searchParams.get("subscription_id");
  const status = searchParams.get("status");

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          router.push("/dashboard");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [router]);

  const isActive = status === "active";
  const isFailed = status === "failed";

  const getStatusIcon = () => {
    if (isActive) {
      return (
        <div
          className="text-6xl text-green-500"
          role="img"
          aria-label="Success"
        >
          ✅
        </div>
      );
    }

    if (isFailed) {
      return (
        <div className="text-6xl text-red-500" role="img" aria-label="Failed">
          ❌
        </div>
      );
    }

    return (
      <div
        className="animate-spin text-6xl text-blue-500"
        role="img"
        aria-label="Processing"
      >
        ⟳
      </div>
    );
  };

  const getStatusMessage = () => {
    if (isActive) {
      return {
        title: "Subscription Activated!",
        description: "Your subscription is now active and ready to use.",
      };
    }

    if (isFailed) {
      return {
        title: "Payment Failed",
        description:
          "We couldn't process your payment. Please try again or contact support.",
      };
    }

    return {
      title: "Processing Subscription",
      description: "We're setting up your subscription. Please wait...",
    };
  };

  const { title, description } = getStatusMessage();

  return (
    <div className="bg-background flex min-h-screen items-center justify-center px-4">
      <Card className="w-full max-w-md space-y-6 p-8 text-center">
        <div className="space-y-4">
          {/* Status Icon */}
          <div className="flex justify-center">{getStatusIcon()}</div>

          {/* Status Message */}
          <div className="space-y-2">
            <h1 className="text-2xl font-semibold">{title}</h1>
            <p className="text-muted-foreground">{description}</p>
          </div>

          {/* Subscription Details */}
          {subscriptionId && (
            <div className="text-muted-foreground bg-muted/50 rounded-md p-3 text-sm">
              <p className="font-medium">Subscription ID:</p>
              <p className="font-mono text-xs break-all">{subscriptionId}</p>
            </div>
          )}

          {/* Countdown */}
          <div className="text-muted-foreground text-sm">
            Redirecting to dashboard in {timeLeft} second
            {timeLeft !== 1 ? "s" : ""}...
          </div>

          {/* Fallback Link */}
          <div className="border-t pt-4">
            <Button asChild variant="outline" size="sm">
              <Link href="/dashboard">Go to Dashboard</Link>
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
