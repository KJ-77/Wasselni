import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, Heart } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { Ride } from "./types";
import { useNavigate } from "react-router-dom";

function RideCard({ ride }: { ride: Ride }) {
  const navigate = useNavigate();

  const handleBooking = () => {
    navigate(`/booking/${ride.id}`, { state: { ride } });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="p-4 max-w-3xl mx-auto"
    >
      <Card className="rounded-2xl shadow-md border border-green-300 overflow-hidden w-3xl">
        <div className="bg-green-600 text-white px-4 py-2 text-sm font-medium flex items-center gap-2">
          <span>⭐ Top Rated Driver</span>
          <span>•</span>
          <span>{ride.bookingType} Book</span>
        </div>

        <CardContent className="p-5">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-purple-500 text-white flex items-center justify-center font-bold text-xl">
                {ride.driver.avatar}
              </div>
              <div>
                <h2 className="text-lg font-semibold">{ride.driver.name}</h2>
                <div className="flex-col items-center gap-4 text-sm">
                  <span>⭐ {ride.driver.rating} </span>
                  <span className="text-secondary">({ride.driver.trips} trips)</span>
                  <div className="flex items-center gap-1 pt-3">
                    {ride.driver.isVerified && <Badge variant="secondary">Verified</Badge>}
                    {ride.driver.aubGrad && <Badge variant="outline">AUB</Badge>}
                    {ride.driver.isPro && <Badge className="bg-green-200 text-green-700">Pro</Badge>}
                  </div>
                </div>
              </div>
            </div>

            <div className="text-right">
              <p className="text-3xl font-bold text-green-600">${ride.price.amount}</p>
              <p className="text-xs text-gray-500">per person</p>
              {ride.price.discount && <p className="text-xs text-green-500">Save ${ride.price.discount}</p>}
            </div>
          </div>

          {/* Route */}
          <div className="rounded-xl p-4 mt-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold">{ride.route.from.name}</p>
                <p className="text-sm text-gray-500">{ride.route.from.location}</p>
              </div>
              <p className="text-sm font-medium">{ride.route.departureTime}</p>
            </div>

            <div className="flex items-center pl-7 my-4 gap-4">
              <Slider defaultValue={[30]} max={30} step={0} disabled color="blue"
              orientation="vertical" inverted/>  
              <Slider defaultValue={[30]} max={30} step={0} disabled color="blue"
              orientation="vertical" /> 
              <Badge variant="outline" className="px-3 py-1 text-gray-700">
                🚗 {ride.tripDetails.duration} • {ride.tripDetails.distance} km • {ride.tripDetails.description}
              </Badge>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold">{ride.route.to.name}</p>
                <p className="text-sm text-gray-500">{ride.route.to.location}</p>
              </div>
              <p className="text-sm font-medium">{ride.route.arrivalTime}</p>
            </div>
          </div>

          {/* Vehicle */}
          <div className="flex items-center gap-4 text-sm text-gray-600 mt-4">
            <span>🚙 {ride.vehicle.model}</span>
            <span>👥 {ride.vehicle.seats.booked}/{ride.vehicle.seats.total} seats</span>
            {ride.vehicle.amenities.map(amenity => <span key={amenity}>❄️ {amenity}</span>)}
          </div>

          {/* Footer Buttons */}
          <div className="flex items-center justify-between mt-6">
            <Button onClick={handleBooking} className="bg-green-600 hover:bg-green-700 w-full py-6 text-base font-semibold flex-1 rounded-xl">
              ⚡ Book Instantly
            </Button>

            <div className="flex items-center gap-3 ml-4">
              <Button variant="outline" className="rounded-xl p-3">
                <MessageSquare className="w-5 h-5" />
              </Button>
              <Button variant="outline" className="rounded-xl p-3">
                <Heart className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
export default RideCard;