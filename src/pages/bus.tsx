import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Map from "@/components/map";
import TestimonialsSection from "@/components/home/testimonialsSection";
import FaqSection from "@/components/home/faqSection";
import { motion } from "framer-motion";
import OptionForm from "@/components/optionForm";

import {
  BusFront,
  Ticket,
  MapPin,
  Wallet,
  Navigation,
  Bell,
  Search,
} from "lucide-react";


const busWallpaper = "/src/assets/homeWallpaper/final.png"; // Using the same wallpaper for consistency

export function Bus() {
  const features = [
    {
      icon: <MapPin className="h-10 w-10 text-primary" />,
      title: "Real-Time Tracking",
      description:
        "No more guessing games. Watch your bus move on the map and know exactly when it will arrive.",
    },
    {
      icon: <Wallet className="h-10 w-10 text-primary" />,
      title: "Digital Wallet & Payments",
      description:
        "Top up your in-app wallet and pay your fare with a simple tap. It's cashless, fast, and secure.",
    },
    {
      icon: <Navigation className="h-10 w-10 text-primary" />,
      title: "Smart Route Planner",
      description:
        "Find the most efficient route to your destination, including transfers and walking directions.",
    },
    {
      icon: <Bell className="h-10 w-10 text-primary" />,
      title: "Service Alerts",
      description:
        "Receive push notifications for schedule changes, delays, or detours on your favorite routes.",
    },
  ];

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <div
        className="relative flex h-[60vh] items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: `url(${busWallpaper})` }}
      >
        <div className="absolute inset-0 bg-black/50" />
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="relative z-10 text-center text-white px-4"
        >
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
            Find Your Bus, Ride with Ease.
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-slate-200">
            Your ultimate bus companion in Lebanon. Real-time tracking, seamless
          </p>
        </motion.div>
        <div className="absolute top-[75%] left-1/2 w-11/12 max-w-5xl -translate-x-1/2">
          <OptionForm />
        </div>
      </div>
          
      {/* Main Content */}
      <main>
        {/* How It Works Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold">
                Get Rolling in 3 Easy Steps
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div className="flex flex-col items-center">
                <div className="bg-primary/10 p-4 rounded-full">
                  <Search className="h-10 w-10 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mt-4 mb-2">
                  1. Find Your Route
                </h3>
                <p className="text-muted-foreground max-w-xs">
                  Enter your destination to see all available bus lines and
                  schedules.
                </p>
              </div>
              <div className="flex flex-col items-center">
                <div className="bg-primary/10 p-4 rounded-full">
                  <BusFront className="h-10 w-10 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mt-4 mb-2">
                  2. Track in Real-Time
                </h3>
                <p className="text-muted-foreground max-w-xs">
                  Select your bus and watch its live location on the map until
                  it reaches your stop.
                </p>
              </div>
              <div className="flex flex-col items-center">
                <div className="bg-primary/10 p-4 rounded-full">
                  <Ticket className="h-10 w-10 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mt-4 mb-2">
                  3. Pay & Ride
                </h3>
                <p className="text-muted-foreground max-w-xs">
                  Use your in-app wallet to pay the fare. Just scan, hop on,
                  and enjoy the journey.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Live Map Section */}
        <section className="py-16 md:py-24 bg-slate-50 dark:bg-slate-900">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold">
                Live Bus Tracking
              </h2>
              <p className="text-lg text-muted-foreground mt-2 max-w-2xl mx-auto">
                Follow live locations of Wasselni buses across Lebanon — stay
                connected wherever you go.
              </p>
            </div>
            <Card className="overflow-hidden shadow-lg rounded-2xl">
              <CardContent className="p-0 h-[500px]">
                <Map />
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold">
                A Smarter Way to Travel
              </h2>
              <p className="text-lg text-muted-foreground mt-2 max-w-2xl mx-auto">
                Our service is packed with features to make your bus journey
                seamless and stress-free.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((item, index) => (
                <Card
                  key={index}
                  className="text-center hover:shadow-xl transition-shadow duration-300 p-6"
                >
                  <CardHeader className="items-center p-0 mb-4">
                    {item.icon}
                  </CardHeader>
                  <CardContent className="p-0">
                    <h3 className="text-xl font-semibold mb-2">
                      {item.title}
                    </h3>
                    <p className="text-muted-foreground">
                      {item.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
             <div className="text-center mt-12">
                <Button asChild size="lg">
                    <Link to="/bus-routes">Explore All Routes</Link>
                </Button>
            </div>
          </div>
        </section>

        <TestimonialsSection />

        <FaqSection />
      </main>
    </div>
  );
}

export default Bus;