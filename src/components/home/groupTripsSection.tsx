import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Clock, Users, Landmark, Library, Mountain, Home } from "lucide-react";
import { useNavigate } from "react-router-dom";

type Trip = {
  id: string;
  title: string;
  subtitle?: string;
  price: number;
  tag?: string;
  departure: string;
  duration: string;
  includes: string;
  busType: string;
  seatsInfo: string;
  schedule: string;
  gradient?: string;
};

const TRIPS: Trip[] = [
  {
    id: "t1",
    title: "Baalbek Ancient Ruins",
    subtitle: "Historical Wonder Tour",
    price: 25,
    tag: "Full Day",
    departure: "Beirut Central District",
    duration: "8 hours (9 AM - 5 PM)",
    includes: "Transport • Guide • Lunch",
    busType: "Luxury Bus",
    seatsInfo: "25/40 seats",
    schedule: "Every Saturday",
    gradient: "linear-gradient(120deg,#f97316,#ef4444)",
  },
  {
    id: "t2",
    title: "Cedars of Lebanon",
    subtitle: "Nature & Heritage Tour",
    price: 30,
    tag: "Full Day",
    departure: "Tripoli & Beirut",
    duration: "10 hours (7 AM - 5 PM)",
    includes: "Transport • Guide • Meals",
    busType: "Climate Control",
    seatsInfo: "18/35 seats",
    schedule: "Every Sunday",
    gradient: "linear-gradient(120deg,#10b981,#06b6d4)",
  },
  {
    id: "t3",
    title: "Jeita & Harissa",
    subtitle: "Caves & Cable Car Adventure",
    price: 20,
    tag: "Half Day",
    departure: "Jounieh Marina",
    duration: "6 hours (10 AM - 4 PM)",
    includes: "Transport • Entry Tickets",
    busType: "Mini Bus",
    seatsInfo: "12/20 seats",
    schedule: "Fri & Sat",
    gradient: "linear-gradient(120deg,#6366f1,#8b5cf6)",
  },
];

const DESTINATIONS = [
  { id: "d1", name: "Byblos", subtitle: "Ancient Phoenician City", price: "$18", icon: "landmark" },
  { id: "d2", name: "Tyre", subtitle: "UNESCO World Heritage", price: "$22", icon: "library" },
  { id: "d3", name: "Douma", subtitle: "Mountain Village Escape", price: "$15", icon: "mountain" },
  { id: "d4", name: "Anjar", subtitle: "Umayyad Archaeological Site", price: "$28", icon: "home" },
];

export default function GroupTripsSection() {
    const navigate = useNavigate();

  const handleBook = (trip: Trip) => {
    navigate("/tripBookingPage", { state: { trip } });
  };
  const handleDestination = () => {
    navigate("/trips");
  }
  return (
    <section className="w-full py-14 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold">Discover Lebanon with Group Bus Trips</h2>
          <p className="text-sm md:text-base text-muted-foreground mt-3 max-w-2xl mx-auto">
            Join organized group trips to Lebanon’s most beautiful destinations. Professional drivers, comfortable buses, and unforgettable experiences.
          </p>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
          {TRIPS.map((trip, idx) => (
            <motion.div
              key={trip.id}
              className="group"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -8 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: idx * 0.06 }}
            >
              <motion.div
                whileHover={{ scale: 1.01 }}
                transition={{ type: "spring", stiffness: 300, damping: 22 }}
              >
                <Card
                  className="overflow-hidden h-[360px] rounded-2xl shadow-xl"
                  style={{
                    background: "var(--color-card)",
                    color: "var(--color-card-foreground)",
                    borderRadius: 12,
                  }}
                >
                  {/* Gradient header with animated glow */}
                  <motion.div
                    aria-hidden
                    className="px-6 py-5"
                    style={{
                      background: trip.gradient ?? "var(--brand-gradient)",
                      color: "var(--primary-foreground)",
                      borderTopLeftRadius: 12,
                      borderTopRightRadius: 12,
                      boxShadow: "0 6px 20px rgba(0,0,0,0.06)",
                    }}
                    whileHover={{
                      boxShadow: "0 28px 80px rgba(0,0,0,0.18)",
                      translateY: -2,
                    }}
                    transition={{ type: "spring", stiffness: 200, damping: 20 }}
                  >
                    <div className="flex items-start gap-3 justify-between">
                      <div>
                        <h3 className="text-lg font-semibold leading-tight">{trip.title}</h3>
                        {trip.subtitle && <div className="text-xs opacity-90 mt-1">{trip.subtitle}</div>}
                      </div>

                      {trip.tag && (
                        <div className="text-xs px-3 py-1 rounded-full bg-white/20 text-white font-medium">
                          {trip.tag}
                        </div>
                      )}
                    </div>
                  </motion.div>

                  {/* Content */}
                  <CardContent className="px-6 py-6">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="text-2xl font-bold">${trip.price}</div>
                        <div className="text-xs text-muted-foreground">per person</div>
                      </div>

                      <div className="text-right">
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <MapPin className="w-4 h-4" />
                          <span className="inline-block max-w-[11rem]">{trip.departure}</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground mt-2">
                          <Clock className="w-4 h-4" />
                          <span>{trip.duration}</span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 text-sm text-muted-foreground">{trip.includes}</div>

                    <div className="mt-4 flex flex-wrap items-center gap-3 text-xs">
                      <div className="inline-flex items-center gap-2 px-2 py-1 rounded-md bg-muted/40 text-muted-foreground">
                        <Users className="w-4 h-4" />
                        <span className="font-medium">{trip.busType}</span>
                      </div>

                      <div className="inline-flex items-center gap-2 px-2 py-1 rounded-md bg-muted/40 text-muted-foreground">
                        <span className="font-medium">{trip.seatsInfo}</span>
                      </div>

                      <div className="inline-flex items-center gap-2 px-2 py-1 rounded-md bg-muted/40 text-muted-foreground">
                        <span className="font-medium">{trip.schedule}</span>
                      </div>
                    </div>

                    <div className="mt-6">
                        <Button
                        className="w-full rounded-full"
                        style={{
                          background: "var(--brand-gradient)",
                          color: "var(--primary-foreground)",
                          boxShadow: "0 8px 28px rgba(2,6,23,0.08)",
                        }}
                        onClick={() => handleBook(trip)} 
                      >
                        Book Trip
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* More destinations strip */}
        <div
          className="rounded-2xl p-8 mb-12"
          style={{
            background: "var(--color-card)",
            boxShadow: "0 8px 24px rgba(2,6,23,0.04)",
          }}
        >
          <div className="max-w-5xl mx-auto text-center mb-6">
            <h4 className="font-semibold text-lg">More Amazing Destinations</h4>
            <p className="text-sm text-muted-foreground mt-2">Handpicked trips & hidden gems across Lebanon</p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-8 mb-6">
            {DESTINATIONS.map((d, i) => (
              <motion.div
                key={d.id}
                className="flex flex-col items-center gap-2 w-36"
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: i * 0.06 }}
              >
                {/* Circle with transparent bg and border, outline style */}
                <motion.div
                  className="w-16 h-16 rounded-full flex items-center justify-center border"
                  style={{
                    background: "transparent",
                    borderColor: "rgba(2,6,23,0.06)",
                    boxShadow: "0 6px 18px rgba(2,6,23,0.04)",
                  }}
                  whileHover={{ scale: 1.06 }}
                  transition={{ type: "spring", stiffness: 250, damping: 20 }}
                >
                  {/* Lucide icon (simple) */}
                  <DestinationIcon name={d.icon} />
                </motion.div>

                <div className="text-sm font-semibold">{d.name}</div>
                <div className="text-xs text-muted-foreground">{d.subtitle}</div>
                <div className="text-sm font-bold text-primary">{d.price}</div>
              </motion.div>
            ))}
          </div>

          <div className="flex justify-center">
            <Button
              className="rounded-full px-6 py-3"
              style={{
                background: "var(--brand-gradient)",
                color: "var(--primary-foreground)",
                
              }}
              onClick={handleDestination}
            >
              View All Destinations
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

/* Small helper that maps keys to lucide icons (simple, filled-looking via CSS color) */
function DestinationIcon({ name }: { name: string }) {
  const common = { className: "w-7 h-7 text-muted-foreground" };
  switch (name) {
    case "landmark":
      return <Landmark {...common} />;
    case "library":
      return <Library {...common} />;
    case "mountain":
      return <Mountain {...common} />;
    case "home":
      return <Home {...common} />;
    default:
      return <Landmark {...common} />;
  }
}