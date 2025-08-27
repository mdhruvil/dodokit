"use client";

import { GridPattern } from "@/components/grid-pattern";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  ArrowRightIcon,
  CodeIcon,
  LockIcon,
  LucideIcon,
  PackageIcon,
  ZapIcon,
} from "lucide-react";
import Link from "next/link";

type FeatureCardProps = {
  title: string;
  icon: LucideIcon;
  description: string;
};

function FeatureCard({ title, icon: Icon, description }: FeatureCardProps) {
  return (
    <div className="bg-background flex h-full flex-col gap-3 border p-5 md:gap-5">
      <Icon className="size-6" />
      <div>
        <h2 className="text-sm font-semibold md:text-base">{title}</h2>
        <p className="text-muted-foreground text-sm">{description}</p>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <section className="relative h-screen overflow-hidden py-32">
      <div className="absolute inset-x-0 top-0 flex h-full w-full items-center justify-center opacity-100">
        <GridPattern
          squares={[
            [2, 2],
            [5, 1],
            [8, 2],
            [5, 3],
            [13, 5],
            [13, 1],
          ]}
          width={80}
          height={80}
          className={cn(
            "[mask-image:radial-gradient(90%_90%_at_center,white,transparent)]",
            "opacity-50",
          )}
        />
      </div>
      <div className="relative z-10 container mx-auto space-y-32 px-4">
        <div className="w-full space-y-6 text-center">
          <div className="bg-background/30 mx-auto w-fit rounded-xl p-4 shadow-sm backdrop-blur-sm">
            <img src="/logo.svg" alt="DodoKit Logo" className="h-16" />
          </div>
          <div>
            <h1 className="mb-6 text-2xl font-bold tracking-tight text-pretty lg:text-5xl">
              DodoPayments + Supabase Boilerplate
            </h1>
            <p className="text-muted-foreground mx-auto max-w-3xl lg:text-xl">
              A complete Next.js boilerplate with DodoPayments integration and
              Supabase authentication. Everything you need to start building
              your subscription-based application.
            </p>
          </div>
          <div className="mt-6 flex justify-center gap-3">
            <Button asChild>
              <Link href="/dashboard">
                Get Started <ArrowRightIcon className="size-4" />
              </Link>
            </Button>
          </div>
        </div>
        <div className="mx-auto grid max-w-6xl items-center border md:grid-cols-2 lg:grid-cols-4">
          <FeatureCard
            title="DodoPayments Integration"
            icon={CodeIcon}
            description="Pre-configured payment processing with DodoPayments API"
          />
          <FeatureCard
            title="Supabase Auth"
            icon={LockIcon}
            description="Complete authentication system with Supabase integration"
          />
          <FeatureCard
            title="Ready to Deploy"
            icon={ZapIcon}
            description="Production-ready boilerplate with best practices included"
          />
          <FeatureCard
            title="Complete Starter Kit"
            icon={PackageIcon}
            description="Everything you need to build subscription-based apps"
          />
        </div>
      </div>
    </section>
  );
}
