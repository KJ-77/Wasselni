import { motion } from "framer-motion";
import Wizard from "@/components/offerRides/wizard/wizard";

export default function OfferRidesPage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="w-full min-h-screen bg-gradient-to-br from-background via-background to-muted/20 pt-24 pb-16"
    >
      <div className="max-w-6xl">
        <motion.div variants={itemVariants} className="mb-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Offer a Ride
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Share your journey and help others reach their destination. Earn money while making new connections.
          </p>
        </motion.div>

          

    
      </div>
      <div className="w-full flex justify-center">
         <motion.div variants={itemVariants}>
          <Wizard />
        </motion.div>
      </div>


    </motion.div>
  );
}
