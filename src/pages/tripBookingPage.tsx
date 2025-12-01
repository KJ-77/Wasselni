import * as React from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { ArrowLeft, Minus, Plus } from "lucide-react";

// Mock data - In a real app, this would be fetched from a data store.
const touristicTrips = [
  {
    id: "trip-001",
    title: "Historical Journey Through North Lebanon",
    price: 35,
    seats: 15,
  },
  {
    id: "trip-002",
    title: "Bekaa Valley: Wine & Ancient Ruins",
    price: 45,
    seats: 20,
  },
  {
    id: "trip-003",
    title: "Shouf Mountains: Cedars & Palaces",
    price: 30,
    seats: 18,
  },
   {
    id: "trip-004",
    title: "Southern Wonders: Sidon & Tyre",
    price: 40,
    seats: 22,
  },
];


export function TripBookingPage() {
    const { tripId } = useParams();
    const navigate = useNavigate();
    const trip = touristicTrips.find(t => t.id === tripId);
    
    const [seatCount, setSeatCount] = React.useState(1);
    const totalPrice = trip ? seatCount * trip.price : 0;

    const handleBooking = (e: React.FormEvent) => {
        e.preventDefault();
        toast.success("Booking Confirmed!", {
            description: `You have successfully booked ${seatCount} seat(s) for "${trip?.title}".`,
            action: {
                label: "View My Trips",
                onClick: () => navigate('/trips'), // Assuming a future "My Trips" page
            },
        });
        // In a real app, you'd navigate away or show a success state.
    };

    if (!trip) {
        return (
            <div className="container mx-auto px-4 py-24 text-center">
                <h1 className="text-4xl font-bold">Trip Not Found</h1>
                <p className="mt-4 text-lg text-muted-foreground">The trip you are trying to book does not exist.</p>
                <Button asChild className="mt-8">
                    <Link to="/trips">Back to All Trips</Link>
                </Button>
            </div>
        );
    }

    const incrementSeats = () => {
        setSeatCount(prev => Math.min(prev + 1, trip.seats));
    };

    const decrementSeats = () => {
        setSeatCount(prev => Math.max(1, prev - 1));
    };


    return (
        <div className="container mx-auto px-4 py-20 md:py-24">
            <div className="max-w-2xl mx-auto">
                <div className="mb-6">
                    <Button asChild variant="ghost" className="pl-0">
                         <Link to={`/trips/${tripId}`}><ArrowLeft className="mr-2 h-4 w-4" /> Back to Trip Details</Link>
                    </Button>
                </div>
                <Card className="shadow-lg">
                    <form onSubmit={handleBooking}>
                        <CardHeader>
                            <CardTitle className="text-3xl font-bold">Book Your Seat</CardTitle>
                            <CardDescription>You are booking a seat for the trip: <strong>{trip.title}</strong></CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="p-4 bg-slate-100 dark:bg-slate-800/50 rounded-lg flex justify-between items-center">
                                <Label htmlFor="seats" className="text-lg font-semibold">How many seats?</Label>
                                <div className="flex items-center gap-2">
                                    <Button type="button" size="icon" variant="outline" onClick={decrementSeats}>
                                        <Minus className="h-4 w-4" />
                                    </Button>
                                    <Input id="seats" type="number" value={seatCount} readOnly className="w-16 text-center text-lg font-bold" />
                                     <Button type="button" size="icon" variant="outline" onClick={incrementSeats}>
                                        <Plus className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                            <div className="border-t border-dashed my-4" />
                            <div className="flex justify-between items-center text-xl">
                                <p className="text-muted-foreground">Price per seat:</p>
                                <p className="font-semibold">${trip.price}</p>
                            </div>
                             <div className="flex justify-between items-center text-2xl font-bold">
                                <p>Total Price:</p>
                                <p className="text-primary">${totalPrice}</p>
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button type="submit" size="lg" className="w-full">Confirm & Pay</Button>
                        </CardFooter>
                    </form>
                </Card>
            </div>
        </div>
    );
}

export default TripBookingPage;
