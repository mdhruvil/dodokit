"use client";
import { Button } from "@/components/ui/button";
import { createCheckoutSession } from "@/lib/dodopayments/create-checkout-session";

export default function Home() {
  return (
    <div className="grid min-h-screen grid-rows-[20px_1fr_20px] items-center justify-items-center gap-16 p-8 pb-20 font-sans sm:p-20">
      <Button
        onClick={async () => {
          const result = await createCheckoutSession(
            "pdt_z8xeYo1THenoKzczBs5bz",
          );
          console.log({ result });
        }}
      >
        Test Button
      </Button>
    </div>
  );
}
