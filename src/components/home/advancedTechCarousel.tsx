import { Card, CardContent } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { motion } from "framer-motion";
import { Brain, MapPin, DollarSign, Bus, ShieldCheck, Leaf } from "lucide-react";

const features = [
  {
    icon: <Brain className="w-8 h-8 text-blue-600" />, 
    title: "AI-Powered Matching",
    desc: "Smart algorithms match you with compatible riders based on preferences, routes, and schedules.",
    bullets: [
      "Personality compatibility scoring",
      "Route optimization algorithms",
      "Preference-based matching",
    ],
  },
  {
    icon: <MapPin className="w-8 h-8 text-green-600" />, 
    title: "Live Trip Tracking",
    desc: "Real-time GPS tracking with ETA updates, route sharing, and automatic arrival notifications.",
    bullets: [
      "Live location sharing",
      "Automatic ETA updates",
      "Route deviation alerts",
    ],
  },
  {
    icon: <DollarSign className="w-8 h-8 text-orange-600" />, 
    title: "Smart Pricing",
    desc: "Fair, transparent pricing with automatic cost splitting and fuel price adjustments.",
    bullets: [
      "Automatic cost calculation",
      "Fuel price integration",
      "Distance-based fair splitting",
    ],
  },
  {
    icon: <Bus className="w-8 h-8 text-purple-600" />, 
    title: "Multi-Modal Routes",
    desc: "Combine ridesharing with public transport, walking, and more for optimal journeys.",
    bullets: [
      "Bus + rideshare combinations",
      "Walking route integration",
      "Cost and time optimization",
    ],
  },
  {
    icon: <ShieldCheck className="w-8 h-8 text-red-600" />, 
    title: "Advanced Safety",
    desc: "Comprehensive safety system with emergency features, driver verification, and 24/7 support.",
    bullets: [
      "Emergency SOS button",
      "24/7 safety monitoring",
      "Driver background verification",
    ],
  },
  {
    icon: <Leaf className="w-8 h-8 text-green-700" />, 
    title: "Eco‑Friendly Impact",
    desc: "Track your environmental impact and contribute to reducing Lebanon's carbon footprint.",
    bullets: [
      "CO₂ savings tracking",
      "Environmental impact reports",
      "Green transportation rewards",
    ],
  },
];

export default function FeaturesCarousel() {
  return (
    <section className="w-full py-10 flex flex-col items-center">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-3xl md:text-4xl font-bold text-center mb-3"
      >
        Advanced Ridesharing Technology
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="text-center text-gray-600 max-w-2xl mb-10"
      >
        Next‑generation features that make Wasselni the smartest way to travel in Lebanon
      </motion.p>

      {/* Hybrid: grid on desktop, carousel on mobile/tablet */}
      <div className="w-full max-w-6xl mx-auto">
        {/* Desktop grid (shown on md+) */}
        <div className="hidden md:grid grid-cols-3 gap-6">
          {features.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: i * 0.06 }}
            >
              <Card className="rounded-2xl shadow-sm p-6 h-full" style={{ background: 'var(--color-card)', color: 'var(--color-card-foreground)' }}>
                <CardContent className="flex flex-col gap-4">
                  <div>{f.icon}</div>
                  <h3 className="font-semibold text-xl">{f.title}</h3>
                  <p className="text-sm text-muted-foreground">{f.desc}</p>
                  <ul className="text-sm text-muted-foreground list-disc ml-5 mt-2 space-y-1">
                    {f.bullets.map((b, bi) => (
                      <li key={bi}>{b}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Mobile / tablet carousel (shown below md) */}
        <div className="md:hidden">
          <Carousel className="w-full">
            <CarouselContent>
              {features.map((f, i) => (
                <CarouselItem key={i} className="basis-11/12 p-4">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.96 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.45 }}
                  >
                    <Card className="rounded-2xl shadow-sm p-6 h-full" style={{ background: 'var(--color-card)', color: 'var(--color-card-foreground)' }}>
                      <CardContent className="flex flex-col gap-4">
                        <div>{f.icon}</div>
                        <h3 className="font-semibold text-xl">{f.title}</h3>
                        <p className="text-sm text-muted-foreground">{f.desc}</p>
                        <ul className="text-sm text-muted-foreground list-disc ml-5 mt-2 space-y-1">
                          {f.bullets.map((b, bi) => (
                            <li key={bi}>{b}</li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  </motion.div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </div>
    </section>
  );
}
