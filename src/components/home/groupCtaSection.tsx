import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { CheckCircle, Search, UserPlus } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function GroupCtaSection() {
  const navigate = useNavigate();

  return (
    <section className="w-full">
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="py-16"
        style={{
          background: "var(--brand-gradient)",
          color: "var(--primary-foreground)",
        }}
      >
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">Start Your Ridesharing Journey Today</h2>
          <p className="text-sm md:text-base max-w-2xl mx-auto mb-6">
            Join 50,000+ Lebanese riders who've discovered the smarter, safer, and more affordable way to travel across Lebanon.
          </p>

          <div className="flex items-center justify-center gap-4 mb-6 flex-wrap">
            <motion.div whileHover={{ scale: 1.02 }} transition={{ type: "spring", stiffness: 260, damping: 22 }}>
              <Button
                variant="default"
                className="px-6 py-3 rounded-md flex items-center gap-3"
                style={{
                  background: "rgba(255,255,255,0.95)",
                  color: "var(--color-card)",
                }}
                onClick={() => navigate("/rides")}
              >
                <Search className="w-4 h-4 text-muted-foreground" /> Find a Ride
              </Button>
            </motion.div>

            <motion.div whileHover={{ scale: 1.02 }} transition={{ type: "spring", stiffness: 260, damping: 22 }}>
              <Button
                className="px-6 py-3 rounded-md flex items-center gap-3 border"
                style={{
                  background: "transparent",
                  color: "var(--primary-foreground)",
                  borderColor: "rgba(255,255,255,0.22)",
                }}
              >
                <UserPlus className="w-4 h-4" /> Become a Driver
              </Button>
            </motion.div>
          </div>

          {/* micro-features */}
          <div className="mt-4 flex items-center justify-center gap-8 flex-wrap text-sm opacity-95">
            <FeatureItem icon={<CheckCircle className="w-4 h-4" />} label="Free to join" />
            <FeatureItem icon={<CheckCircle className="w-4 h-4" />} label="100% verified users" />
            <FeatureItem icon={<CheckCircle className="w-4 h-4" />} label="4.9★ average rating" />
          </div>
        </div>
      </motion.div>
    </section>
  );
}

function FeatureItem({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="inline-flex items-center gap-2 px-2 py-1">
      <span className="inline-flex items-center justify-center rounded-full w-6 h-6 bg-white/10">
        {icon}
      </span>
      <span className="text-sm">{label}</span>
    </div>
  );
}
