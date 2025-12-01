import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import RideCard from "./rideCard";
import { Ride } from "./types";

export default function RideList() {
  const rides: Ride[] = [
    {
      id: 1,
      driver: {
        name: "Ahmad M.",
        avatar: "AM",
        rating: 4.9,
        trips: 127,
        isVerified: true,
        isPro: true,
        aubGrad: true,
      },
      price: {
        amount: 8,
        currency: "USD",
        discount: 42,
      },
      route: {
        from: {
          name: "Beirut Central District",
          location: "Hamra, Beirut",
        },
        to: {
          name: "Tripoli City Center",
          location: "Al-Mina, Tripoli",
        },
        departureTime: "Today 2:30 PM",
        arrivalTime: "Today 4:45 PM",
      },
      tripDetails: {
        duration: "2h 15m",
        distance: 85,
        description: "Highway Route",
      },
      vehicle: {
        model: "BMW X3",
        seats: {
          booked: 2,
          total: 4,
        },
        amenities: ["AC", "Music"],
      },
      bookingType: 'Instant',
    },
    {
      id: 2,
      driver: {
        name: "Fatima K.",
        avatar: "FK",
        rating: 4.8,
        trips: 89,
        isVerified: true,
        isPro: false,
        aubGrad: false,
      },
      price: {
        amount: 7,
        currency: "USD",
      },
      route: {
        from: {
          name: "Jounieh",
          location: "Casino Du Liban",
        },
        to: {
          name: "Byblos",
          location: "Old Souk",
        },
        departureTime: "Today 3:00 PM",
        arrivalTime: "Today 3:45 PM",
      },
      tripDetails: {
        duration: "45m",
        distance: 30,
        description: "Coastal Road",
      },
      vehicle: {
        model: "Honda Civic",
        seats: {
          booked: 1,
          total: 3,
        },
        amenities: ["AC"],
      },
      bookingType: 'Request',
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="max-w-3xl mx-auto p-4 space-y-6"
    >
      {rides.map((ride) => (
        <RideCard key={ride.id} ride={ride} />
      ))}

      <div className="flex justify-center pt-4">
        <Button className="rounded-xl px-6 py-5 text-base font-semibold" variant="outline">
          Load More Rides (20 more available)
        </Button>
      </div>
    </motion.div>
  );
}
