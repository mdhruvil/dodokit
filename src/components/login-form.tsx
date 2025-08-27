"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { sendOtp, verifyOtp } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";
import { OTPInput } from "input-otp";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState<"email" | "otp">("email");
  const router = useRouter();

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsLoading(true);
    setError(null);

    try {
      const { error } = await sendOtp(email, "login");
      if (error) throw error;
      setStep("otp");
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsLoading(true);
    setError(null);

    try {
      const { error } = await verifyOtp(email, otp);
      if (error) throw error;

      router.push("/protected");
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      {step === "email" ? (
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Login</CardTitle>
            <CardDescription>
              Enter your email to receive a login code
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSendOtp}>
              <div className="flex flex-col gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                {error && <p className="text-sm text-red-500">{error}</p>}
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Sending code..." : "Send login code"}
                </Button>
              </div>
              <div className="mt-4 text-center text-sm">
                Don&apos;t have an account?{" "}
                <Link
                  href="/auth/sign-up"
                  className="underline underline-offset-4"
                >
                  Sign up
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Enter login code</CardTitle>
            <CardDescription>We sent a 6-digit code to {email}</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleVerifyOtp}>
              <div className="flex flex-col gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="otp">Login Code</Label>
                  <div className="flex justify-center">
                    <OTPInput
                      containerClassName="flex items-center gap-3 has-disabled:opacity-50 w-full mt-3"
                      maxLength={6}
                      value={otp}
                      onChange={(newOtp) => setOtp(newOtp)}
                      render={({ slots }) => (
                        <div className="flex w-full justify-around gap-2">
                          {slots.map((slot, idx) => (
                            <div
                              className={cn(
                                "border-input bg-background text-foreground flex size-10 items-center justify-center rounded-md border font-medium shadow-xs transition-[color,box-shadow]",
                                {
                                  "border-ring ring-ring/50 z-10 ring-[3px]":
                                    slot.isActive,
                                },
                              )}
                              key={idx}
                            >
                              {slot.char !== null && <div>{slot.char}</div>}
                            </div>
                          ))}
                        </div>
                      )}
                    />
                  </div>
                  <p className="text-muted-foreground text-center text-sm">
                    Enter the 6-digit code sent to your email
                  </p>
                </div>
                {error && <p className="text-sm text-red-500">{error}</p>}
                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    className="grow"
                    onClick={() => {
                      setStep("email");
                      setOtp("");
                      setError(null);
                    }}
                  >
                    Back
                  </Button>
                  <Button
                    type="submit"
                    className="grow"
                    disabled={isLoading || otp.length !== 6}
                  >
                    {isLoading ? "Signing in..." : "Sign in"}
                  </Button>
                </div>
              </div>
            </form>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
