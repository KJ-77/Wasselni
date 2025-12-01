import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {  Calendar, Users, DollarSign, CheckCircle } from "lucide-react";

// The same mock data used in trips.tsx. In a real app, this would come from a data store or API.
const touristicTrips = [
  {
    id: "trip-001",
    title: "Historical Journey Through North Lebanon",
    coverImage: "https://images.unsplash.com/photo-1588263385312-d3b234d8b48b?q=80&w=2070&auto=format&fit=crop",
    stops: ["Byblos Citadel", "Our Lady of Nourieh", "Batroun Old Souk", "Tripoli Citadel"],
    date: "2025-12-20",
    price: 35,
    seats: 15,
    driverName: "Ahmad M.",
    driverAvatar: "https://randomuser.me/api/portraits/men/32.jpg",
    description: "Embark on a breathtaking journey through the historical heart of North Lebanon. We'll explore ancient citadels, serene monasteries, and the vibrant old souks that tell the story of a thousand years."
  },
  {
    id: "trip-002",
    title: "Bekaa Valley: Wine & Ancient Ruins",
    coverImage: "https://images.unsplash.com/photo-1547494590-7f7222b10d0f?q=80&w=1974&auto=format&fit=crop",
    stops: ["Baalbek Ruins", "Chateau Ksara", "Anjar Citadel", "Our Lady of Zahle"],
    date: "2025-12-22",
    price: 45,
    seats: 20,
    driverName: "Lara H.",
    driverAvatar: "https://randomuser.me/api/portraits/women/44.jpg",
    description: "Indulge your senses in the Bekaa Valley. Stand in awe of the magnificent Baalbek ruins, savor world-renowned Lebanese wine at Chateau Ksara, and uncover the unique history of the Anjar Citadel."
  },
  {
    id: "trip-003",
    title: "Shouf Mountains: Cedars & Palaces",
    coverImage: "https://images.unsplash.com/photo-1627993418525-29e24f54519c?q=80&w=2070&auto=format&fit=crop",
    stops: ["Deir el Qamar", "Beiteddine Palace", "Shouf Cedar Reserve", "Moussa Castle"],
    date: "2025-12-25",
    price: 30,
    seats: 18,
    driverName: "Karim S.",
    driverAvatar: "https://randomuser.me/api/portraits/men/36.jpg",
    description: "Escape to the tranquil beauty of the Shouf Mountains. Wander through the historic village of Deir el Qamar, marvel at the intricate architecture of Beiteddine Palace, and walk among the ancient trees of the Shouf Cedar Reserve."
  },
   {
    id: "trip-004",
    title: "Southern Wonders: Sidon & Tyre",
    coverImage: "https://images.unsplash.com/photo-1629013028682-74d39c342f22?q=80&w=2062&auto=format&fit=crop",
    stops: ["Sidon Sea Castle", "Tyre Roman Hippodrome", "Qana Grotto", "Tyre Beach"],
    date: "2025-12-28",
    price: 40,
    seats: 22,
    driverName: "Maya R.",
    driverAvatar: "https://randomuser.me/api/portraits/women/50.jpg",
    description: "Discover the coastal treasures of South Lebanon. Explore the formidable Sidon Sea Castle, walk through the sprawling Roman ruins of Tyre, and visit the sacred grotto of Qana."
  },
];


export function TripDetailsPage() {
    const { tripId } = useParams();
    const trip = touristicTrips.find(t => t.id === tripId);

    if (!trip) {
        return (
            <div className="container mx-auto px-4 py-24 text-center">
                <h1 className="text-4xl font-bold">Trip Not Found</h1>
                <p className="mt-4 text-lg text-muted-foreground">
                    The trip you are looking for does not exist.
                </p>
                <Button asChild className="mt-8">
                    <Link to="/trips">Back to All Trips</Link>
                </Button>
            </div>
        );
    }

    return (
        <div className="bg-slate-50 dark:bg-slate-950">
            {/* Image Header */}
            <div className="relative h-64 md:h-96 w-full">
                <img src={trip.coverImage} alt={trip.title} className="h-full w-full object-cover"/>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"/>
                <div className="absolute bottom-0 left-0 p-8">
                    <h1 className="text-3xl md:text-5xl font-bold text-white tracking-tight">{trip.title}</h1>
                </div>
            </div>

            {/* Main Content */}
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Left Column (Description & Itinerary) */}
                    <div className="lg:col-span-2 space-y-8">
                        <div>
                            <h2 className="text-2xl font-semibold mb-4 border-b pb-2">About This Trip</h2>
                            <p className="text-muted-foreground leading-relaxed">{trip.description}</p>
                        </div>
                         <div>
                            <h2 className="text-2xl font-semibold mb-4 border-b pb-2">Itinerary</h2>
                            <ul className="space-y-4">
                                {trip.stops.map((stop, index) => (
                                    <li key={index} className="flex items-center">
                                        <CheckCircle className="h-6 w-6 text-primary mr-4 flex-shrink-0"/>
                                        <span className="text-lg">{stop}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Right Column (Booking Card) */}
                    <aside className="lg:col-span-1">
                        <Card className="shadow-lg sticky top-24">
                            <CardHeader>
                                <CardTitle className="text-2xl">Trip Details</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center gap-4">
                                    <Avatar className="h-12 w-12">
                                        <AvatarImage src={trip.driverAvatar} alt={trip.driverName} />
                                        <AvatarFallback>{trip.driverName.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <p className="font-semibold">{trip.driverName}</p>
                                        <p className="text-sm text-muted-foreground">Your Trip Leader</p>
                                    </div>
                                </div>
                                <div className="border-t border-dashed my-4" />
                                <div className="flex justify-between items-center text-lg">
                                    <div className="flex items-center text-muted-foreground"><Calendar className="h-5 w-5 mr-2"/> Date</div>
                                    <span className="font-semibold">{new Date(trip.date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</span>
                                </div>
                                <div className="flex justify-between items-center text-lg">
                                    <div className="flex items-center text-muted-foreground"><Users className="h-5 w-5 mr-2"/> Available Seats</div>
                                    <Badge variant="outline" className="text-lg">{trip.seats}</Badge>
                                </div>
                                <div className="flex justify-between items-center text-lg">
                                    <div className="flex items-center text-muted-foreground"><DollarSign className="h-5 w-5 mr-2"/> Price</div>
                                    <span className="font-semibold">${trip.price} / seat</span>
                                </div>
                                <Button asChild size="lg" className="w-full mt-4">
                                    <Link to={`/tripBookingPage/${trip.id}`}>Book Your Seat</Link>
                                </Button>
                            </CardContent>
                        </Card>
                    </aside>

                </div>
            </div>
        </div>
    );
}

export default TripDetailsPage;
