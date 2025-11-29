import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Stepper from "./stepper";
import Step1RouteDetails from "./steps/step1RouteDetails";
import Step2VehicleAndPricing from "./steps/step2VehicleAndPricing";
import Step3Preferences from "./steps/step3Preferences";
import Step4ReviewAndPublish from "./steps/step4ReviewAndPublish";
import { validateAll } from "./steps/validation";
import { WizardData, Vehicle } from "./steps/types";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import AddVehicleModal from "../AddVehicleModal";

export default function Wizard() {
  const navigate = useNavigate();
  // Lightweight fallback toast replacement while a project-wide toast isn't available
  const toast = (opts: { title?: string; description?: string; variant?: string }) => {
    if (opts.variant === "destructive") {
      // destructives show a blocking alert for now
      // eslint-disable-next-line no-alert
      alert(`${opts.title || ""}\n${opts.description || ""}`);
    } else {
      // non-destructive just log
      console.log("Toast:", opts.title, opts.description);
    }
  };
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  

  const [vehicles, setVehicles] = useState<Vehicle[]>([
    {
        id: 1,
        make: 'BMW',
        model: 'X3',
        year: 2020,
        color: 'Black',
        plate: 'ABC 123',
        type: 'suv',
        capacity: 5,
        photo: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="200" height="200"%3E%3Crect fill="%23334155" width="200" height="200"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="60" fill="%23fff"%3E🚙%3C/text%3E%3C/svg%3E',
        verified: true
    },
    {
        id: 2,
        make: 'Toyota',
        model: 'Camry',
        year: 2019,
        color: 'White',
        plate: 'XYZ 789',
        type: 'sedan',
        capacity: 5,
        photo: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="200" height="200"%3E%3Crect fill="%23e5e7eb" width="200" height="200"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="60" fill="%23374151"%3E🚗%3C/text%3E%3C/svg%3E',
        verified: true
    }
  ]);
  const [isAddVehicleModalOpen, setIsAddVehicleModalOpen] = useState(false);

  const handleAddVehicle = (newVehicleData: Omit<Vehicle, 'id' | 'verified'>) => {
    const newVehicle: Vehicle = {
      ...newVehicleData,
      id: vehicles.length > 0 ? Math.max(...vehicles.map(v => Number(v.id))) + 1 : 1,
      verified: false, // New vehicles are pending verification
    };
    setVehicles(prev => [...prev, newVehicle]);
    // Optionally, automatically select the new vehicle
    setData(prev => ({...prev, vehicleAndPricing: {...prev.vehicleAndPricing, selectedVehicleId: newVehicle.id}}));
    toast({
        title: "Vehicle Added",
        description: `${newVehicle.make} ${newVehicle.model} has been registered.`,
    });
  };


  const [data, setData] = useState<WizardData>({
    routeDetails: {
      departureCity: "",
      departureAddress: "",
      arrivalCity: "",
      arrivalAddress: "",
      departureDate: "",
      departureTime: "",
      isRoundTrip: false,
      returnDate: "",
      returnTime: "",
      stops: [],
    },
    vehicleAndPricing: {
      selectedVehicleId: null,
      availableSeats: 0,
      pricePerSeat: 0,
    },
    preferences: {
      amenities: [],
      instantBooking: false,
      womenOnly: false,
      verifiedOnly: false,
      minRating: 0,
      additionalNotes: "",
    },
    publishing: {
      featuredRide: false,
      recurringRide: false,
      agreeTerms: false,
    },
  });

  const steps = [
    { id: 1, title: "Route Details", completed: currentStep > 1 },
    { id: 2, title: "Vehicle & Pricing", completed: currentStep > 2 },
    { id: 3, title: "Preferences", completed: currentStep > 3 },
    { id: 4, title: "Review & Publish", completed: false },
  ];

  const next = () => {
    if (validateAll[currentStep] && !validateAll[currentStep](data)) {
      toast({
        variant: "destructive",
        title: "Incomplete Step",
        description: "Please fill all required fields before continuing.",
      });
      return;
    }
    if (currentStep < 4) setCurrentStep(currentStep + 1);
  };

  const back = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <Step1RouteDetails
            data={data}
            setData={setData}
          />
        );
      case 2:
        return (
          <Step2VehicleAndPricing
            data={data}
            setData={setData}
            vehicles={vehicles}
            onOpenAddVehicleModal={() => setIsAddVehicleModalOpen(true)}
          />
        );
      case 3:
        return (
          <Step3Preferences
            data={data}
            setData={setData}
          />
        );
      case 4:
        return (
          <Step4ReviewAndPublish
            data={data}
            setData={setData}
            vehicles={vehicles}
          />
        );
    }
  };

  

  const submit = async () => {
    if (!validateAll[4](data)) {
      toast({
        variant: "destructive",
        title: "Terms and Conditions",
        description: "You must agree to the terms and conditions to publish a ride.",
      });
      return;
    }
    if (!validateAll[1](data) || !validateAll[2](data) || !validateAll[3](data)) {
        toast({
            variant: "destructive",
            title: "Incomplete Form",
            description: "Please complete all previous steps before submitting.",
        });
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`/api/dashboard/profile/rides`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed to save ride");
      const body = await res.json();
      toast({
        title: "Ride Published!",
        description: "Your ride is now visible to passengers.",
      });
      console.log("Ride created:", body);
      setTimeout(() => {
        navigate("/rides");
      }, 1000);
    } catch (err) {
      console.error(err);
      toast({
          variant: "destructive",
          title: "Submission Failed",
          description: err instanceof Error ? err.message : "Failed to submit ride. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full mx-auto py-6 space-y-5 flex flex-col items-center px-10"
    >
      <div className="w-full flex justify-center">
        <Stepper steps={steps} currentStep={currentStep} />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="w-full flex justify-center"
        >
          {/* <div className="mb-6">
            <h2 className="text-2xl font-semibold mb-2">{getStepTitle()}</h2>
            <p className="text-muted-foreground">Step {currentStep} of 4</p>
          </div> */}




{/* MAIN container that calls the steps */}

          <div className="w-full flex justify-center ">
            <div className="w-full max-w-[96rem]">{/* card container set to very large (8XL-like) */}
              {renderStep()}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      

      {loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/20 flex items-center justify-center z-50"
        >
          <motion.div
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className=" rounded-lg p-6 shadow-lg"
          >
            <p className="font-semibold">Creating your ride...</p>
          </motion.div>
        </motion.div>
      )}


          {currentStep > 1 && (
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <Button variant="secondary" onClick={back} disabled={loading}>
                Back
              </Button>
            </motion.div>
          )}
        
      <div className="w-full max-w-[96rem] flex justify-between items-center pt-4">
        <AnimatePresence>
          {currentStep > 1 && (
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <Button variant="secondary" onClick={back} disabled={loading}>
                Back
              </Button>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence mode="wait">
          {currentStep < 4 ? (
            <motion.div key="next" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}>
              <Button onClick={next} disabled={loading}>
                Next
              </Button>
            </motion.div>
          ) : (
            <motion.div key="publish" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-2xl ml-4">
                 <Card className="bg-gradient-to-r from-blue-600 to-green-600 border-0">
                    <div className="p-6 flex items-center justify-between">
                        <div className="text-white">
                            <h4 className="text-lg font-semibold mb-1">Ready to publish your ride?</h4>
                            <p className="text-sm text-white/90">Your ride will be visible to passengers immediately.</p>
                        </div>
                        <Button onClick={submit} disabled={loading || !data.publishing.agreeTerms} size="lg" className="bg-white text-foreground hover:bg-gray-200">
                             {loading ? "Publishing..." : "Finish & Publish"}
                        </Button>
                    </div>
                </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <AddVehicleModal
        isOpen={isAddVehicleModalOpen}
        onOpenChange={setIsAddVehicleModalOpen}
        onVehicleAdd={handleAddVehicle}
      />
    </motion.div>
  );
}


