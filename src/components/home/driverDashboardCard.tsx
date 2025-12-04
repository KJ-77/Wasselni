import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, DollarSign } from "lucide-react";
import { useNavigate } from "react-router-dom"; // ✅ import navigate

type ActiveRide = {
  id: string;
  fromTo: string;
  when: string;
  passengers: string[]; // initials
  price: number;
};

const sampleRides: ActiveRide[] = [
  {
    id: "r1",
    fromTo: "Beirut → Tripoli",
    when: "Today 2:30 PM • 3 passengers booked",
    passengers: ["A", "M", "S"],
    price: 24,
  },
  {
    id: "r2",
    fromTo: "AUB → Downtown",
    when: "Tomorrow 8:00 AM • 2 passengers booked",
    passengers: ["L", "K"],
    price: 12,
  },
];

export default function DriverDashboardCard() {
  const navigate = useNavigate();

  const handlePublish = () => {
    // Navigate to publish ride page
    navigate("/offerRides");
  };

  return (
    <div className="px-6 md:px-0">
      <Card
        className="w-full max-w-md rounded-xl shadow-xl"
        style={{
          background: "var(--color-card)",
          color: "var(--color-card-foreground)",
          borderRadius: "12px",
        }}
      >
        {/* Header with gradient */}
        <div
          className="rounded-t-xl px-4 py-4"
          style={{
            background: "var(--brand-gradient)",
            borderTopLeftRadius: 12,
            borderTopRightRadius: 12,
          }}
        >
          <div className="text-sm text-primary-foreground font-semibold">Driver Dashboard</div>
          <div className="text-xs text-primary-foreground/90 mt-1">Manage your rides and earnings</div>
        </div>

        <CardContent className="px-4 pt-4">
          {/* Earnings box */}
          <div
            className="rounded-lg p-4 mb-4"
            style={{
              background: "rgba(255,255,255,0.04)",
              color: "var(--color-card-foreground)",
            }}
          >
            <div className="flex items-center justify-between">
              <div className="text-xs text-muted-foreground">This Month's Earnings</div>
              <div className="text-sm text-muted-foreground">
                <DollarSign className="inline-block w-4 h-4 mr-1 align-middle" />
              </div>
            </div>
            <div className="mt-3 text-2xl font-bold text-secondary">${347}</div>
          </div>

          {/* Active rides list */}
          <div className="space-y-3">
            <div className="text-sm font-medium text-muted-foreground mb-1">Your Active Rides</div>

            {sampleRides.map((r) => (
              <div
                key={r.id}
                className="rounded-md p-3"
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid var(--color-border)",
                }}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div className="font-semibold">{r.fromTo}</div>
                    <div className="text-xs text-muted-foreground mt-1">{r.when}</div>

                    <div className="flex items-center gap-2 mt-3">
                      {r.passengers.map((p, idx) => (
                        <AvatarInitial key={idx} initials={p} />
                      ))}
                      <div className="text-xs text-muted-foreground">+{Math.max(0, 4 - r.passengers.length)}</div>
                    </div>
                  </div>

                  <div className="text-sm font-semibold text-secondary">${r.price}</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>

        <CardFooter className="px-4 pb-4 pt-2">
          <Button
            className="w-full flex items-center justify-center gap-2 rounded-md"
            style={{
              background: "var(--brand-gradient)",
              color: "var(--primary-foreground)",
            }}
            onClick={handlePublish} // ✅ navigate on click
          >
            <Plus className="w-4 h-4" /> <span>Publish New Ride</span>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

/* Small avatar for initials */
function AvatarInitial({ initials }: { initials: string }) {
  return (
    <div
      className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold"
      style={{
        background: "var(--primary)",
        color: "var(--primary-foreground)",
      }}
    >
      {initials}
    </div>
  );
}
