import { PartyPopper } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function TripsPage() {
  return (
    <div className="container mx-auto px-4 py-20 text-center">
      <Alert className="max-w-md mx-auto">
        <PartyPopper className="h-4 w-4" />
        <AlertTitle>Booking Successful!</AlertTitle>
        <AlertDescription>
          Your trip has been booked. You can view your upcoming trips here.
        </AlertDescription>
      </Alert>
      <h1 className="text-3xl font-bold mt-8">My Trips</h1>
      <p className="mt-4 text-gray-600">
        This is where you will see a list of your upcoming and past trips.
      </p>
    </div>
  );
}