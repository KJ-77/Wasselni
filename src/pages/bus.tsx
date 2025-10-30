import Map from "@/components/map";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const Bus = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-800 text-white">
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="pt-16 text-center space-y-4"
      >
        <Badge
          variant="secondary"
          className="bg-indigo-500/20 text-indigo-300 px-4 py-1 rounded-full backdrop-blur-sm"
        >
          Real-Time Tracking
        </Badge>
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
          Bus Tracking
        </h1>
        <p className="text-gray-400 max-w-xl mx-auto">
          Follow live locations of Wasselni buses across Lebanon — stay connected wherever you go.
        </p>
      </motion.div>

      {/* Map Container */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="relative mt-10 flex justify-center px-6 md:px-20"
      >
        <div className="w-full max-w-6xl relative">
          <Card className="overflow-hidden border-none bg-slate-900/60 backdrop-blur-xl shadow-2xl rounded-2xl">
            <CardHeader className="absolute top-4 left-4 z-10 bg-slate-800/70 backdrop-blur-md rounded-lg p-3 shadow-lg">
              <CardTitle className="text-lg text-indigo-400 font-semibold">
                Active Routes
              </CardTitle>
            </CardHeader>

            <CardContent className="p-0">
              {/* MAP */}
              <Map />
            </CardContent>

            {/* Floating CTA */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="absolute bottom-6 right-6"
            >
              <Button className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold shadow-lg rounded-full px-6 py-3">
                View Nearby Buses
              </Button>
            </motion.div>
          </Card>
        </div>
      </motion.div>

      {/* Footer */}
      <footer className="mt-auto py-6 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} Wasselni · All rights reserved
      </footer>
    </div>
  );
};

export default Bus;
