import homePic from "../assets/homeWallpaper/final.png";
import OptionForm from "@/components/optionForm";
import DisplayRideCarousel, { Ride } from "@/components/displayRideCarousel";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import DriverBenefits from "@/components/home/driverBenefits";
import DriverDashboardCard from "@/components/home/driverDashboardCard";
import AdvancedTechCarousel from "@/components/home/advancedTechCarousel";
import SafetySection from "@/components/home/safetySection";
import GroupTripsSection from "@/components/home/groupTripsSection";
import TestimonialsSection from "@/components/home/testimonialsSection";
import FaqSection from "@/components/home/faqSection";
import GroupCtaSection from "@/components/home/groupCtaSection";



const rides: Ride[] = [
  {
    driverInitials: "AM",
    driverName: "Ahmad M.",
    rating: 4.9,
    trips: 127,
    price: 8,
    from: "Beirut Central District",
    to: "Tripoli City Center",
    startTime: "Today 2:30 PM",
    endTime: "Today 4:45 PM",
    car: "BMW X3",
    seats: "2/4 seats",
    duration: "2h 15m",
  },
  {
    driverInitials: "LH",
    driverName: "Lara H.",
    rating: 5.0,
    trips: 89,
    price: 12,
    from: "Beirut Airport",
    to: "Jounieh Marina",
    startTime: "Today 6:00 PM",
    endTime: "Today 7:00 PM",
    car: "Mercedes C Class",
    seats: "1/3 seats",
    duration: "1h 00m",
  },
  {
    driverInitials: "KS",
    driverName: "Karim S.",
    rating: 4.8,
    trips: 203,
    price: 15,
    from: "AUB Main Gate",
    to: "Baalbeck Ancient Ruins",
    startTime: "Tomorrow 8:00 AM",
    endTime: "Tomorrow 11:30 AM",
    car: "Toyota Prius",
    seats: "3/4 seats",
    duration: "3h 30m",
  },
];

const Home = () => {
  return (
    <div className="w-full pt-7">
      {/* HERO */}
      <div
        className="relative flex items-center justify-center w-full min-h-[28rem] bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${homePic})` }}
      >
        <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(0,0,0,0.06), rgba(0,0,0,0.06))" }} />

        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="relative z-10 text-center px-6"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-2">One Lebanon. One Route. One Ride.</h1>
          <p className="text-sm md:text-lg text-muted-foreground/90">
            From the Mountains to the Sea — Ride Together.
          </p>
        </motion.div>

        <div className="absolute top-[80%] left-1/2 transform -translate-x-1/2 w-11/12 md:w-3/4">
          <OptionForm />
        </div>
      </div>

      {/* STATS */}
      <div className="mt-80 mb-10 flex justify-center">
        <div className="max-w-7xl w-full grid grid-cols-1 md:grid-cols-4 gap-16 px-6 text-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-primary">500+</h2>
            <p className="text-sm text-muted-foreground mt-2">Rides Shared</p>
          </div>
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-primary">1200+</h2>
            <p className="text-sm text-muted-foreground mt-2">Happy Users</p>
          </div>
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-primary">3000+</h2>
            <p className="text-sm text-muted-foreground mt-2">KM Driven</p>
          </div>
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-primary">40+</h2>
            <p className="text-sm text-muted-foreground mt-2">Cities Covered</p>
          </div>
        </div>
      </div>

      {/* AVAILABLE RIDES */}
      <section className="px-6 py-10">
        <div className="max-w-6xl mx-auto text-center mb-8">
          <motion.h2 initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-3xl font-bold">
            Available Rides Right Now
          </motion.h2>
          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.1 }} className="text-sm text-muted-foreground mt-2">
            Real-time ride matching with verified drivers. Book instantly or schedule for later.
          </motion.p>
        </div>

        <motion.div
          className="max-w-6xl mx-auto flex items-start justify-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            visible: { transition: { staggerChildren: 0.12 } },
          }}
        >
          {/* DisplayRideCarousel will render the three narrow cards side-by-side */}
          <DisplayRideCarousel rides={rides} />
        </motion.div>

        {/* View All Button */}
        <div className="mt-12 flex justify-center">
          <Link to="/rides">
            <Button
              className="rounded-full px-8 py-4"
              style={{
                background: "var(--brand-gradient)",
                color: "var(--primary-foreground)",
                boxShadow: "0 8px 30px rgba(16, 24, 40, 0.25)",
              }}
            >
              View All Available Rides
            </Button>
          </Link>
        </div>
      </section>
      {/* DRIVER DASHBOARD & BENEFITS */}
      <section className="max-w-7xl mx-auto px-6 py-20">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        <DriverBenefits />
        <DriverDashboardCard />
      </div>
    </section>
      {/* ADVANCED TECHNOLOGY CAROUSEL */}
      <AdvancedTechCarousel />
      {/* SAFETY SECTION */}
      <SafetySection />
      {/* GROUP TRIPS SECTION */}
      <GroupTripsSection />
      {/* TESTIMONIALS SECTION */}
      <TestimonialsSection />
      {/* FAQ SECTION */}
      <FaqSection />
      {/* GROUP CTA SECTION */}
      <GroupCtaSection />

      
    </div>

  );
};

export default Home;
