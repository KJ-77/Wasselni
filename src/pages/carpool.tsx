import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import OptionForm from "@/components/optionForm";
import TestimonialsSection from "@/components/home/testimonialsSection";
import FaqSection from "@/components/home/faqSection";
import { motion } from "framer-motion";

import {
  ShieldCheck,
  Wallet,
  Car,
  UserPlus,
  Star,
  Search,
} from "lucide-react";

const carpoolWallpaper = "/src/assets/homeWallpaper/final.png";

export function Carpool() {
  const benefits = [
    {
      icon: <Wallet className="h-10 w-10 text-primary" />,
      title: "Save on travel",
      description:
        "Share your ride and split the costs. It's an easy way to make your travel cheaper.",
    },
    {
      icon: <Car className="h-10 w-10 text-primary" />,
      title: "Convenient & simple",
      description:
        "Find a ride in just a few clicks. Choose who you travel with and when you leave.",
    },
    {
      icon: <ShieldCheck className="h-10 w-10 text-primary" />,
      title: "Travel with trust",
      description:
        "We verify profiles, ratings, and IDs, so you know who you're travelling with.",
    },
  ];

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <div
        className="relative flex h-[60vh] items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: `url(${carpoolWallpaper})` }}
      >
        <div className="absolute inset-0 bg-black/50" />
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="relative z-10 text-center text-white px-4"
        >
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
            Go the distance, together.
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-slate-200">
            Your adventure awaits. Find a ride or fill your empty seats.
            Wasselni makes carpooling in Lebanon easier than ever.
          </p>
        </motion.div>
        <div className="absolute top-[75%] left-1/2 w-11/12 max-w-5xl -translate-x-1/2">
          <OptionForm />
        </div>
      </div>

      {/* Main Content with top margin to account for OptionForm */}
      <main className="mt-64 md:mt-48">
        {/* How it Works Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold">How It Works</h2>
              <p className="text-lg text-muted-foreground mt-2">
                Carpooling with Wasselni is easy.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <UserPlus className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-2xl font-semibold">For Drivers</h3>
                </div>
                <ul className="space-y-3 list-disc list-inside text-muted-foreground">
                  <li>
                    <strong>Offer a ride:</strong> Set your route, schedule, and
                    price per seat.
                  </li>
                  <li>
                    <strong>Accept bookings:</strong> Review passengers and
                    approve requests.
                  </li>
                  <li>
                    <strong>Drive & earn:</strong> Enjoy the company and cover
                    your petrol costs.
                  </li>
                </ul>
                <div className="mt-6">
                  <Button asChild size="lg" className="w-full md:w-auto">
                    <Link to="/offer-rides">Offer a Ride</Link>
                  </Button>
                </div>
              </Card>
              <Card className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <Search className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-2xl font-semibold">For Passengers</h3>
                </div>
                <ul className="space-y-3 list-disc list-inside text-muted-foreground">
                  <li>
                    <strong>Find your ride:</strong> Search for your destination
                    and filter by date.
                  </li>
                  <li>
                    <strong>Book your seat:</strong> Choose a ride and send a
                    booking request.
                  </li>
                  <li>
                    <strong>Travel together:</strong> Meet your driver and enjoy
                    a smooth journey.
                  </li>
                </ul>
                <div className="mt-6">
                  <Button asChild size="lg" className="w-full md:w-auto">
                    <Link to="/rides">Find a Ride</Link>
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16 md:py-24 bg-slate-50 dark:bg-slate-900">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold">
                Your Ride, Your Choice
              </h2>
              <p className="text-lg text-muted-foreground mt-2 max-w-2xl mx-auto">
                Whether you're driving or need a ride, Wasselni makes
                carpooling simple, affordable, and safe.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {benefits.map((item, index) => (
                <Card
                  key={index}
                  className="text-center hover:shadow-xl transition-shadow duration-300"
                >
                  <CardHeader className="items-center">{item.icon}</CardHeader>
                  <CardContent>
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
          </div>
        </section>

        {/* Safety Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="text-center md:text-left">
                <h2 className="text-3xl md:text-4xl font-bold">
                  Your Safety is Our Priority
                </h2>
                <p className="text-lg text-muted-foreground mt-4">
                  We've built a trustworthy community where safety is key. From
                  verified profiles to member ratings, we have measures in
                  place to help you travel with peace of mind.
                </p>
                <Button asChild className="mt-6" size="lg">
                  <Link to="/safety">Learn more about safety</Link>
                </Button>
              </div>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <ShieldCheck className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg">
                      Verified Profiles
                    </h4>
                    <p className="text-muted-foreground">
                      We ask members to verify their ID and phone number, so
                      you know who you're travelling with.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <Star className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg">Ratings</h4>
                    <p className="text-muted-foreground">
                      Check ratings and reviews from other members to choose
                      the right travel companion for you.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <TestimonialsSection />

        <FaqSection />
      </main>
    </div>
  );
}

export default Carpool;