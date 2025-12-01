import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Calendar, Users } from "lucide-react";
import { motion } from "framer-motion";

// Mock Data for Touristic Trips (Enriched)
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


export function TripsPage() {
    const navigate = useNavigate();

    const handleOfferTripClick = () => {
        navigate('/offerTouristicTrips');
    };

  return (
    <div className="flex flex-col bg-slate-50 dark:bg-slate-950">
      {/* Hero Section */}
      <section className="relative bg-cover bg-center py-20 md:py-32" style={{backgroundImage: "url('https://images.unsplash.com/photo-1558236316-d3b2a2933ddd?q=80&w=2070&auto=format&fit=crop')"}}>
        <div className="absolute inset-0 bg-black/50" />
        <div className="container relative z-10 mx-auto px-4 text-center text-white">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-4xl font-bold tracking-tight md:text-6xl"
          >
            Discover Lebanon's Hidden Gems
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-4 max-w-2xl mx-auto text-lg text-slate-200"
          >
            Join curated bus tours to explore the rich history, vibrant culture, and breathtaking landscapes of Lebanon at an affordable price.
          </motion.p>
           <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
             className="mt-8"
           >
            <Button size="lg" onClick={handleOfferTripClick}>
                Become a Trip Leader
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Trips Grid */}
      <main className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {touristicTrips.map((trip) => (
            <motion.div 
              key={trip.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col h-full">
                <img src={trip.coverImage} alt={trip.title} className="h-56 w-full object-cover"/>
                <CardHeader>
                  <CardTitle>{trip.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                  <div className="flex items-center text-sm text-muted-foreground mb-4">
                    <MapPin className="h-4 w-4 mr-2" />
                    <span>{trip.stops.length} Stops: {trip.stops.slice(0, 2).join(', ')}...</span>
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground mb-4">
                     <Calendar className="h-4 w-4 mr-2" />
                     <span>{new Date(trip.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Users className="h-4 w-4 mr-2" />
                    <span>{trip.seats} Seats Available</span>
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col items-start gap-4 bg-slate-100 dark:bg-slate-900 p-4">
                    <div className="text-2xl font-bold text-primary">${trip.price} <span className="text-sm font-normal text-muted-foreground">/ seat</span></div>
                    <div className="w-full flex flex-col gap-2">
                         <Button asChild className="w-full">
                            <Link to={`/tripBookingPage/${trip.id}`}>Book Your Seat Now</Link>
                        </Button>
                        <Button asChild variant="link" className="p-0 h-auto">
                            <Link to={`/trips/${trip.id}`}>
                                View Details
                            </Link>
                        </Button>
                    </div>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default TripsPage;
