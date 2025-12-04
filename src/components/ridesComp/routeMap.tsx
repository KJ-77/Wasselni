import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Map from "../map";
type RouteMapProps = {
  distance: number;     // km
  duration: string;     // formatted (ex: "2h 15m")
  traffic: "Light" | "Moderate" | "Heavy";
  origin: { lat: number, lng: number };
  destination: { lat: number, lng: number };
  originName: string;
  destinationName: string;
};

export default function RouteMap({ distance, duration, traffic, origin, destination, originName, destinationName }: RouteMapProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="max-w-sm"
    >
      <Card className="rounded-2xl shadow-md overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-700 to-green-600 text-white p-4">
          <p className="font-semibold text-sm flex items-center gap-2">
            📍 Route Map
          </p>
          <p className="text-xs opacity-90">{originName} → {destinationName} • {distance} km</p>
        </div>

        {/* Map */}
        <div className="h-[260px] relative">
          <Map className="absolute inset-0" origin={origin} destination={destination} />
        </div>

        {/* Info Section */}
        <CardContent className="space-y-3 pt-4 pb-6">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Distance</span>
            <span className="font-medium">{distance} km</span>
          </div>

          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Duration</span>
            <span className="font-medium">{duration}</span>
          </div>

          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Traffic</span>

            <span className={`font-medium flex items-center gap-1
              ${traffic === "Light" ? "text-green-600" : ""}
              ${traffic === "Moderate" ? "text-yellow-600" : ""}
              ${traffic === "Heavy" ? "text-red-600" : ""}
            `}>
              ● {traffic}
            </span>
          </div>

          <Button
            variant="outline"
            className="mt-3 w-full rounded-xl py-5 font-semibold"
          >
            View Full Map
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
}
