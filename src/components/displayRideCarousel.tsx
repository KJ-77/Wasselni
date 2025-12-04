import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom"; // ✅ import navigate

export type Ride = {
  driverInitials: string;
  driverName: string;
  rating: number;
  trips: number;
  price: number;
  from: string;
  to: string;
  startTime: string;
  endTime: string;
  car: string;
  seats: string;
  duration: string;
};

interface DisplayRideCarouselProps {
  rides: Ride[];
}

export default function DisplayRideCarousel({ rides }: DisplayRideCarouselProps) {
  const navigate = useNavigate();

  const handleBook = (ride: Ride, idx: number) => {
    // Normalize lightweight ride into the full Ride shape used by BookingPage
    const parsedSeats = (() => {
      try {
        // expected format like "2/4 seats" or "1/3 seats"
        const parts = ride.seats.split("/");
        const bookedPart = parts[0] ? Number(parts[0]) : 0;
        const totalPart = parts[1] ? Number(parts[1].replace(/[^0-9]/g, "")) : 4;
        return { booked: isNaN(bookedPart) ? 0 : bookedPart, total: isNaN(totalPart) ? 4 : totalPart };
      } catch (e) {
        return { booked: 0, total: 4 };
      }
    })();

    const fullRide = {
      id: idx + 1,
      driver: {
        name: ride.driverName,
        avatar: ride.driverInitials,
        rating: ride.rating,
        trips: ride.trips,
        isVerified: false,
        isPro: false,
        aubGrad: false,
      },
      price: { amount: ride.price, currency: "USD" },
      route: {
        from: { name: ride.from, location: "" },
        to: { name: ride.to, location: "" },
        departureTime: ride.startTime,
        arrivalTime: ride.endTime,
      },
      tripDetails: { duration: ride.duration, distance: 0, description: "" },
      vehicle: { model: ride.car, seats: { booked: parsedSeats.booked, total: parsedSeats.total }, amenities: [] },
      bookingType: "Instant",
    };

    navigate(`/booking/${fullRide.id}`, { state: { ride: fullRide } });
  };

  return (
    <div className="flex items-stretch justify-center gap-10 w-full">
      {rides.map((ride, idx) => (
        <Card
          key={idx}
          className="rounded-2xl shadow-md border border-var flex flex-col items-start justify-between"
          style={{
            width: 360,
            minHeight: 480,
            background: "var(--color-card)",
            color: "var(--color-card-foreground)",
            borderColor: "var(--color-border)",
          }}
        >
          <CardHeader className="pt-6 px-6 w-full flex items-start justify-between">
            <div className="flex items-start gap-3">
              <div
                className="flex items-center justify-center rounded-full text-sm font-semibold"
                style={{
                  width: 40,
                  height: 40,
                  background: "var(--color-primary)",
                  color: "var(--primary-foreground)",
                }}
              >
                {ride.driverInitials}
              </div>

              <div className="leading-tight">
                <div className="font-semibold">{ride.driverName}</div>
                <div className="text-xs mt-1 text-var-card-foreground/80 flex items-center gap-2">
                  <Star size={12} />
                  <span>{ride.rating} • {ride.trips} trips</span>
                </div>
              </div>
            </div>

            <div className="font-bold text-base price-accent" style={{ alignSelf: "flex-start" }}>
              ${ride.price}
            </div>
          </CardHeader>

          <CardContent className="px-6 py-3 flex-1 w-full">
            <div className="text-sm mb-3">
              <div className="font-semibold">{ride.from}</div>
              <div className="text-xs mt-1 text-var-card-foreground/80">{ride.startTime}</div>
            </div>

            <div className="flex items-center pl-3 my-4 gap-4">
              <Slider defaultValue={[30]} max={30} step={0} disabled color="blue" orientation="vertical" inverted />
              <Slider defaultValue={[30]} max={30} step={0} disabled color="blue" orientation="vertical" />
              <Badge variant="outline" className="px-3 py-1 text-gray-700">
                🚗 {ride.duration} • 85 km • Highway Route
              </Badge>
            </div>

            <div className="text-sm mb-4">
              <div className="font-semibold">{ride.to}</div>
              <div className="text-xs mt-1 text-var-card-foreground/80">{ride.endTime}</div>
            </div>

            <div className="mt-auto w-full text-xs text-var-card-foreground/80">
              <div className="mb-2">{ride.car} • {ride.seats} • {ride.duration}</div>
            </div>

            <div className="w-full mt-6">
              <Button
                className="w-full rounded-full"
                style={{
                  background: "var(--brand-gradient)",
                  color: "var(--primary-foreground)",
                  boxShadow: "0 6px 18px rgba(0,0,0,0.12)",
                }}
                onClick={() => handleBook(ride, idx)} // ✅ navigate on click
              >
                Book Now
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
