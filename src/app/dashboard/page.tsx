import { redirect } from "next/navigation";

import { LogoutButton } from "@/components/logout-button";
import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function ProtectedPage() {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getUser();

  if (error || !data?.user || !data.user.email) {
    redirect("/auth/login");
  }
  const customerId = data.user.user_metadata?.customerId ?? undefined;

  return (
    <div className="flex h-svh w-full flex-col items-center justify-center gap-2">
      <p>
        Hello <span>{data.user.email}</span>
      </p>
      {customerId && (
        <Button asChild>
          <Link href={`/customer-portal?customer_id=${customerId}`}>
            Customer Portal
          </Link>
        </Button>
      )}

      <LogoutButton />
    </div>
  );
}
