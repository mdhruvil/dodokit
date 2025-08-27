import { createBrowserClient } from "@supabase/ssr";

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_OR_ANON_KEY!,
  );
}

export function sendOtp(email: string, flow: "login" | "signup") {
  const supabase = createClient();
  return supabase.auth.signInWithOtp({
    email,
    options: {
      shouldCreateUser: flow === "signup",
    },
  });
}

export function verifyOtp(email: string, otp: string) {
  const supabase = createClient();
  return supabase.auth.verifyOtp({
    email,
    token: otp,
    type: "email",
  });
}
