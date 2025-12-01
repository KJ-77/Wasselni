import { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Ride } from "@/components/ridesComp/types";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, Loader2 } from "lucide-react";
import { toast } from "sonner"


export default function BookingPage() {
  const { state } = useLocation();
  const { rideId } = useParams<{ rideId: string }>();
  const ride: Ride | undefined = state?.ride;

  if (!ride || ride.id.toString() !== rideId) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            Ride data not found or ID mismatch. Please go back and select a ride again.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50/50 dark:bg-gray-900/50">
      <div className="container mx-auto px-4 py-20">
        <h1 className="text-3xl font-bold tracking-tight text-center mb-8">Confirm your booking</h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <RideSummaryCard ride={ride} />
          </div>
          <div>
            <BookingCard ride={ride} />
          </div>
        </div>
      </div>
    </div>
  );
}

function RideSummaryCard({ ride }: { ride: Ride }) {
  return (
    <Card className="shadow-lg rounded-xl overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-green-500 to-emerald-600 text-white p-6">
        <CardTitle className="text-2xl font-bold">Ride Summary</CardTitle>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        {/* Route Info */}
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="text-emerald-500 font-bold w-12 text-center">FROM</div>
            <div>
              <p className="font-semibold text-lg">{ride.route.from.name}</p>
              <p className="text-sm text-gray-500">{ride.route.from.location}</p>
            </div>
            <p className="text-sm font-medium ml-auto">{ride.route.departureTime}</p>
          </div>
          <div className="pl-6">
            <Separator orientation="vertical" className="h-8 ml-6 bg-gray-300" />
          </div>
          <div className="flex items-center gap-4">
            <div className="text-red-500 font-bold w-12 text-center">TO</div>
            <div>
              <p className="font-semibold text-lg">{ride.route.to.name}</p>
              <p className="text-sm text-gray-500">{ride.route.to.location}</p>
            </div>
            <p className="text-sm font-medium ml-auto">{ride.route.arrivalTime}</p>
          </div>
        </div>
        <Separator />
        {/* Driver Info */}
        <div className="flex items-center gap-4">
          <Avatar className="h-16 w-16 border-2 border-emerald-500">
            <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${ride.driver.name}`} alt={ride.driver.name} />
            <AvatarFallback>{ride.driver.avatar}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-bold text-lg">{ride.driver.name}</p>
            <div className="flex items-center gap-2">
              <span>⭐ {ride.driver.rating}</span>
              <span className="text-gray-500 text-sm">({ride.driver.trips} trips)</span>
            </div>
          </div>
          <div className="ml-auto flex gap-2">
            {ride.driver.isVerified && <Badge variant="secondary">Verified</Badge>}
            {ride.driver.isPro && <Badge className="bg-green-200 text-green-700">Pro</Badge>}
          </div>
        </div>
        <Separator />
        {/* Vehicle & Trip Details */}
        <div>
          <h3 className="font-semibold mb-2">Trip Details</h3>
          <div className="flex justify-between text-sm text-gray-600 dark:text-gray-300">
            <p>🚙 {ride.vehicle.model}</p>
            <p>⏱️ {ride.tripDetails.duration}</p>
            <p>🛣️ {ride.tripDetails.distance} km</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function BookingCard({ ride }: { ride: Ride }) {
  const [seats, setSeats] = useState(1);
  const [bookingStatus, setBookingStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const navigate = useNavigate();

  const availableSeats = ride.vehicle.seats.total - ride.vehicle.seats.booked;
  const serviceFee = 2;
  const totalPrice = (ride.price.amount * seats) + serviceFee;
  

  const handleConfirmBooking = async () => {
    setBookingStatus('loading');
    try {
      // TODO: Add your API call here to book the ride.
      // Example: await bookRideAPI({ rideId: ride.id, seats });
      await new Promise(resolve => setTimeout(resolve, 2000));

      setBookingStatus('success');
                toast.promise<{ name: string }>(
            () =>
              new Promise((resolve) =>
                setTimeout(() => resolve, 2000)
              ),
            {
              loading: 'Booking your ride...',
              success: 'Ride booked successfully! 🎉',
              error: 'Failed to book the ride. Please try again.',
            }
          );
              
      navigate('/', { state: { bookingSuccess: true } });
    } catch (error) {
      console.error("Booking failed:", error);
      setBookingStatus('error');
    }
  };

  return (
    <Card className="shadow-lg rounded-xl sticky top-24">
      <CardHeader>
        <CardTitle>Booking Details</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {bookingStatus === 'error' && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Booking Failed</AlertTitle>
            <AlertDescription>
              Something went wrong. Please try again.
            </AlertDescription>
          </Alert>
        )}
        {/* Seat Selector */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <label htmlFor="seats" className="font-semibold">Seats</label>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="icon" onClick={() => setSeats(s => Math.max(1, s - 1))} disabled={seats <= 1 || bookingStatus === 'loading'}>-</Button>
              <span className="w-10 text-center font-bold">{seats}</span>
              <Button variant="outline" size="icon" onClick={() => setSeats(s => Math.min(availableSeats, s + 1))} disabled={seats >= availableSeats || bookingStatus === 'loading'}>+</Button>
            </div>
          </div>
          <p className="text-xs text-gray-500 text-right">{availableSeats} seats available</p>
        </div>
        <Separator />
        {/* Price Breakdown */}
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <p className="text-gray-600 dark:text-gray-300">${ride.price.amount.toFixed(2)} x {seats} seats</p>
            <p>${(ride.price.amount * seats).toFixed(2)}</p>
          </div>
          <div className="flex justify-between">
            <p className="text-gray-600 dark:text-gray-300">Service fee</p>
            <p>${serviceFee.toFixed(2)}</p>
          </div>
        </div>
        <Separator />
        {/* Total Price */}
        <div className="flex justify-between font-bold text-lg">
          <p>Total Price</p>
          <p>${totalPrice.toFixed(2)}</p>
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          className="w-full h-12 text-lg font-bold bg-green-600 hover:bg-green-700" 
          disabled={seats === 0 || bookingStatus === 'loading'}
          onClick={handleConfirmBooking}
        >
          {bookingStatus === 'loading' && <Loader2 className="mr-2 h-6 w-6 animate-spin" />}
          {bookingStatus === 'loading' ? 'Confirming...' : 'Confirm & Book'}
          
        </Button>
      </CardFooter>
    </Card>
  );
}
