import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { ShieldCheck, MapPin, Siren, Star } from "lucide-react";

export default function SafetySection() {
  const features = [
    {
      icon: <ShieldCheck className="w-6 h-6 text-blue-600" />,
      title: "Identity Verification",
      desc: "All users verify their identity with government ID and university credentials. Drivers undergo additional background checks.",
    },
    {
      icon: <MapPin className="w-6 h-6 text-green-600" />,
      title: "Live Trip Monitoring",
      desc: "Every ride is tracked in real-time. Share your trip with trusted contacts and get automatic safety check-ins.",
    },
    {
      icon: <Siren className="w-6 h-6 text-red-600" />,
      title: "Emergency Response",
      desc: "One-tap SOS button connects you to emergency services and alerts your emergency contacts with your location.",
    },
    {
      icon: <Star className="w-6 h-6 text-purple-600" />,
      title: "Community Ratings",
      desc: "Transparent rating system helps build trust. Both drivers and passengers rate each other after every trip.",
    },
  ];

  return (
    <section className="w-full px-6 py-10 max-w-7xl mx-auto">
      {/* HEADER */}
      <div className="text-center max-w-2xl mx-auto mb-14">
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl font-bold mb-2"
        >
          Your Safety is Our Priority
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-muted-foreground text-sm"
        >
          Advanced verification, real-time monitoring, and comprehensive safety features for peace of mind
        </motion.p>
      </div>

      {/* TWO COLUMN LAYOUT */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
        {/* LEFT: CAROUSEL */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full"
        >
          <Carousel className="w-full lg:hidden">
            <CarouselContent>
              {features.map((f, i) => (
                <CarouselItem key={i}>
                  <Card className="p-6 shadow-sm border rounded-2xl">
                    <CardContent className="flex flex-col space-y-4 p-0">
                      {f.icon}
                      <h3 className="font-semibold text-lg">{f.title}</h3>
                      <p className="text-sm text-muted-foreground">{f.desc}</p>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>

          {/* Desktop: Static Grid */}
          <div className="hidden lg:grid grid-cols-1 gap-8 pr-6">
            {features.map((f, i) => (
              <div key={i} className="flex items-start space-x-4">
                {f.icon}
                <div>
                  <h3 className="font-semibold text-lg">{f.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* RIGHT: SAFETY CARD */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Card className="border shadow-md rounded-2xl p-0 overflow-hidden">
            <div className="bg-red-500 text-white p-4 font-semibold">Safety Center</div>
            <CardContent className="p-6 space-y-6">
              <div>
                <p className="font-medium text-green-600">Trip Active</p>
                <p className="text-xs text-muted-foreground">Monitoring enabled + 2 contacts notified</p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 rounded-lg bg-muted/40">
                  <div>
                    <p className="font-semibold">Mom</p>
                    <p className="text-xs text-muted-foreground">+961 3 123 456</p>
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-muted/40">
                  <div>
                    <p className="font-semibold">Lello</p>
                    <p className="text-xs text-muted-foreground">+961 70 987 654</p>
                  </div>
                </div>
              </div>

              <button className="w-full py-3 bg-red-600 text-white font-semibold rounded-xl shadow">EMERGENCY SOS</button>

              <div className="text-sm flex justify-between">
                <span className="text-muted-foreground">Safety Score</span>
                <span className="font-bold text-blue-600">95%</span>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* STATS ROW */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center mt-20">
        <div>
          <p className="text-2xl font-bold text-blue-600">100%</p>
          <p className="text-sm text-muted-foreground">ID Verified Users</p>
        </div>
        <div>
          <p className="text-2xl font-bold text-green-600">24/7</p>
          <p className="text-sm text-muted-foreground">Safety Monitoring</p>
        </div>
        <div>
          <p className="text-2xl font-bold text-yellow-600">4.9★</p>
          <p className="text-sm text-muted-foreground">Average Safety Rating</p>
        </div>
        <div>
          <p className="text-2xl font-bold text-red-600">30s</p>
          <p className="text-sm text-muted-foreground">Emergency Response</p>
        </div>
      </div>
    </section>
  );
}
