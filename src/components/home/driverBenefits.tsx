import * as React from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { DollarSign, ShieldCheck, Calendar } from "lucide-react";

export default function DriverBenefits() {
  return (
    <section className="px-6 md:px-12">
      <div className="max-w-xl">
        <h3 className="text-2xl md:text-3xl font-bold mb-4">
          Turn Your Empty Seats Into Extra Income
        </h3>

        <p className="text-sm text-muted-foreground mb-6">
          Already driving? Share your ride and earn money while helping others get around Lebanon safely and affordably.
        </p>

        <div className="space-y-4 mb-6">
          <Feature
            icon={<DollarSign className="w-5 h-5" />}
            title="Earn $200-500/month"
            desc="Cover your fuel costs and earn extra income by sharing rides you're already taking."
          />
          <Feature
            icon={<ShieldCheck className="w-5 h-5" />}
            title="Verified passengers only"
            desc="All passengers go through ID verification and university authentication for your safety."
          />
          <Feature
            icon={<Calendar className="w-5 h-5" />}
            title="Flexible scheduling"
            desc="Publish rides on your schedule. One-time trips or recurring weekly commutes."
          />
        </div>

        <div>
          <Button
            className="rounded-md px-5 py-3"
            style={{
              background: "var(--brand-gradient)",
              color: "var(--primary-foreground)",
              boxShadow: "0 8px 24px rgba(16,24,40,0.08)",
            }}
          >
            Start Earning Today
          </Button>
        </div>
      </div>
    </section>
  );
}

function Feature({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <Card
        className="w-10 h-10 flex items-center justify-center rounded-md p-0"
        style={{
          background: "var(--color-popover)",
          color: "var(--color-popover-foreground)",
          boxShadow: "0 6px 16px rgba(2,6,23,0.06)",
        }}
      >
        <div className="text-primary">{icon}</div>
      </Card>

      <div>
        <div className="font-semibold">{title}</div>
        <div className="text-sm text-muted-foreground mt-1">{desc}</div>
      </div>
    </div>
  );
}
