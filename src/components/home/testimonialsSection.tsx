import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";

import { Star } from "lucide-react";

export type Testimonial = {
  id: string;
  name: string;
  role?: string;
  rating?: number; // 0-5
  quote: string;
  initials?: string;
  gradient?: string; // optional for large banner cards
  variant?: "card" | "banner"; // small card or big banner
};

const DEFAULT_TESTIMONIALS: Testimonial[] = [
  {
    id: "t1",
    name: "Sarah M.",
    role: "AUB Student • Passenger",
    rating: 5,
    initials: "S",
    quote:
      "I've saved over $300 this semester using Wasselni! The drivers are all verified students, so I feel completely safe. Plus, I've made some great friends during rides.",
    variant: "card",
  },
  {
    id: "t2",
    name: "Ahmad K.",
    role: "LAU Student • Driver",
    rating: 4.9,
    initials: "A",
    quote:
      "As a driver, I earn $400+ monthly just by sharing my daily commute. The app handles everything - payments, matching, safety. It's completely changed my university experience.",
    variant: "card",
  },
  {
    id: "t3",
    name: "Lara H.",
    role: "Working Professional • Passenger",
    rating: 5,
    initials: "L",
    quote:
      "The AI matching is incredible — I always get paired with people who have similar schedules and preferences. My commute is now actually enjoyable!",
    variant: "card",
  },
  {
    id: "t4",
    name: "Maya R.",
    role: "USJ Student • Driver",
    initials: "M",
    quote:
      "I love how the app prioritizes safety. All passengers are verified, and I can share my trip details with family. It's ridesharing done right for Lebanon.",
    variant: "banner",
    gradient: "linear-gradient(90deg,#3b82f6,#06b6d4)",
  },
  {
    id: "t5",
    name: "Karim S.",
    role: "NDU Student • Passenger",
    initials: "K",
    quote:
      "The environmental impact tracking is amazing! I've helped save 2.3 tons of CO₂ this year. It feels good to be part of the solution for Lebanon's traffic problem.",
    variant: "banner",
    gradient: "linear-gradient(90deg,#10b981,#f97316)",
  },
];

type TestimonialsSectionProps = {
  testimonials?: Testimonial[]; // optional override
};

export default function TestimonialsSection({ testimonials }: TestimonialsSectionProps) {
  const list = testimonials ?? DEFAULT_TESTIMONIALS;

  // split small cards (variant card) and banners (variant banner)
  const smallCards = list.filter((t) => t.variant !== "banner").slice(0, 3);
  const banners = list.filter((t) => t.variant === "banner").slice(0, 2);

  return (
    <section className="w-full py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <h2 className="text-2xl md:text-3xl font-bold">Loved by Riders Across Lebanon</h2>
          <p className="text-sm md:text-base text-muted-foreground mt-2">
            Real stories from our community of drivers and passengers
          </p>
        </motion.div>

        {/* Top small testimonial cards row */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            visible: { transition: { staggerChildren: 0.08 } },
          }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
        >
          {smallCards.map((t) => (
            <motion.div
              key={t.id}
              variants={{
                hidden: { opacity: 0, y: 8 },
                visible: { opacity: 1, y: 0 },
              }}
              whileHover={{ y: -6 }}
              transition={{ type: "spring", stiffness: 280, damping: 26 }}
            >
              <Card
                className="rounded-2xl p-4"
                style={{
                  background: "var(--color-card)",
                  color: "var(--color-card-foreground)",
                }}
              >
                <CardContent className="p-4">
                  <div className="flex items-start gap-4">
                    <AvatarInitial initials={t.initials || t.name.split(" ").map((s) => s[0]).join("").slice(0,2)} />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-semibold">{t.name}</div>
                          {t.role && <div className="text-xs text-muted-foreground">{t.role}</div>}
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-amber-400" />
                          <span className="text-sm font-semibold">{t.rating?.toFixed(1) ?? "5.0"}</span>
                        </div>
                      </div>

                      <blockquote className="mt-3 text-sm text-muted-foreground">“{t.quote}”</blockquote>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom banner row: 2 wide gradient testimonials */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
        >
          {banners.map((b) => (
            <motion.div
              key={b.id}
              className="rounded-2xl overflow-hidden"
              variants={{
                hidden: { opacity: 0, y: 8 },
                visible: { opacity: 1, y: 0 },
              }}
              whileHover={{ translateY: -6 }}
              transition={{ type: "spring", stiffness: 260, damping: 24 }}
            >
              <div
                className="p-6 rounded-2xl h-full flex flex-col justify-between"
                style={{
                  background: b.gradient ?? "var(--brand-gradient)",
                  color: "var(--primary-foreground)",
                }}
              >
                <div>
                  <div className="flex items-center gap-4">
                    <AvatarInitial initials={b.initials || b.name[0]} whiteBg />
                    <div>
                      <div className="font-semibold">{b.name}</div>
                      {b.role && <div className="text-xs opacity-90">{b.role}</div>}
                    </div>
                  </div>

                  <blockquote className="mt-4 text-sm leading-relaxed">“{b.quote}”</blockquote>
                </div>

                <div className="mt-6 flex items-center gap-4 justify-start">
                  <div className="text-xs opacity-90">Verified • Community Rated</div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* Small Avatar initials component (shadcn-like) */
function AvatarInitial({ initials, whiteBg }: { initials: string; whiteBg?: boolean }) {
  const bg = whiteBg ? "rgba(255,255,255,0.14)" : "var(--primary)";
  const color = whiteBg ? "var(--primary-foreground)" : "var(--primary-foreground)";
  return (
    <div
      aria-hidden
      className="w-10 h-10 rounded-full flex items-center justify-center font-semibold"
      style={{
        background: bg,
        color,
      }}
    >
      {initials}
    </div>
  );
}
