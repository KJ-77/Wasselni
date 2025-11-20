import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import RideCard from "./rideCard";

export default function RideList() {
  const rides = [
    { id: 1 },
    { id: 2 },
    { id: 3 },
    { id: 4 },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="max-w-3xl mx-auto p-4 space-y-6"
    >
      {rides.map((ride) => (
        <RideCard key={ride.id} />
      ))}

      <div className="flex justify-center pt-4">
        <Button className="rounded-xl px-6 py-5 text-base font-semibold" variant="outline">
          Load More Rides (20 more available)
        </Button>
      </div>
    </motion.div>
  );
}
