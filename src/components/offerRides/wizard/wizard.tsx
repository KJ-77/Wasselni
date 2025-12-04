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
import { transformWizardDataToRidePayload } from "@/services/RideDataService";
import apiClient from "@/services/ApiClient";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

export default function Wizard() {
  const navigate = useNavigate();
  const auth = useAuth();
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
    toast.success("Vehicle Added", {
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
    const validation = validateAll[currentStep](data);
    if (!validation.isValid) {
      toast.error("Incomplete Step", {
        description: (
          <div className="flex flex-col gap-1">
            <p className="font-medium">Please complete the following fields:</p>
            <ul className="list-disc list-inside space-y-1">
              {validation.errors.map((error, index) => (
                <li key={index} className="text-sm">{error}</li>
              ))}
            </ul>
          </div>
        ),
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
    // 1. Validate form
    const step4Validation = validateAll[4](data);
    if (!step4Validation.isValid) {
      toast.error("Terms and Conditions", {
        description: step4Validation.errors.join(", "),
      });
      return;
    }

    // Validate all previous steps
    const allValidations = [
      { step: 1, validation: validateAll[1](data) },
      { step: 2, validation: validateAll[2](data) },
      { step: 3, validation: validateAll[3](data) },
    ];

    const invalidStep = allValidations.find(v => !v.validation.isValid);
    if (invalidStep) {
      toast.error(`Incomplete Form - Step ${invalidStep.step}`, {
        description: (
          <div className="flex flex-col gap-1">
            <p className="font-medium">Please complete the following fields:</p>
            <ul className="list-disc list-inside space-y-1">
              {invalidStep.validation.errors.map((error, index) => (
                <li key={index} className="text-sm">{error}</li>
              ))}
            </ul>
          </div>
        ),
      });
      return;
    }

    // 2. Get driver ID from auth
    const driverId = auth.driverId;
    if (!driverId) {
      toast.error("Driver ID Missing", {
        description: "Unable to get driver information. Please try signing in again.",
      });
      return;
    }

    // 3. Get selected vehicle
    const selectedVehicle = vehicles.find(v => v.id === data.vehicleAndPricing.selectedVehicleId);
    if (!selectedVehicle) {
      throw new Error("Selected vehicle not found");
    }

    setLoading(true);
    try {
      // 4. Transform data to get ride object
      const { ride } = transformWizardDataToRidePayload(data, driverId, selectedVehicle);

      // TEMPORARY: Skip route creation and use hardcoded route_id = 1 for testing
      // TODO: Re-enable route creation once map/route selection is implemented
      console.log("[Wizard] Using hardcoded route_id = 1 for testing");

      // 5. Create ride with route_id = 1 (POST /rides)
      console.log("[Wizard] Creating ride...");
      const ridePayload = {
        ...ride,
        route_id: 1,  // Hardcoded for testing
      };

      const rideResponse = await apiClient.createRide(ridePayload as any);
      console.log("[Wizard] Ride created successfully:", rideResponse);

      // Note: Stops creation also skipped for now since routes are not being created

      toast.success("Ride Published!", {
        description: "Your ride is now visible to passengers.",
      });

      setTimeout(() => {
        navigate("/rides");
      }, 1000);

    } catch (err) {
      console.error(err);
      toast.error("Submission Failed", {
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


