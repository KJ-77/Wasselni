import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Stepper from "./stepper";
import Step1CarDetails from "./steps/step1CarDetails";
import Step2DriverInfo from "./steps/step2DriverInfo";
import Step3Payment from "./steps/step3Payment";
import Step4Summary from "./steps/step4Summary";
import { validateAll } from "./steps/validation";
import { WizardData } from "./steps/types";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function Wizard() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [data, setData] = useState<WizardData>({
    car: { brand: "", model: "", year: "" },
    driver: { fullName: "", phone: "" },
    payment: { method: "", cardNumber: "" },
  });

  const steps = [
    { id: 1, title: "Route Details", completed: currentStep > 1 },
    { id: 2, title: "Vehicle & Pricing", completed: currentStep > 2 },
    { id: 3, title: "Preferences", completed: currentStep > 3 },
    { id: 4, title: "Review & Publish", completed: false },
  ];

  const next = () => {
    if (validateAll[currentStep] && !validateAll[currentStep](data)) {
      setError("Please fill all required fields.");
      return;
    }
    setError(null);
    if (currentStep < 4) setCurrentStep(currentStep + 1);
  };

  const back = () => {
    setError(null);
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <Step1CarDetails data={data} setData={setData} />;
      case 2:
        return <Step2DriverInfo data={data} setData={setData} />;
      case 3:
        return <Step3Payment data={data} setData={setData} />;
      case 4:
        return <Step4Summary data={data} setData={setData} />;
    }
  };

  const getStepTitle = () => {
    const titles: Record<number, string> = {
      1: "Where are you going?",
      2: "Tell us about your vehicle",
      3: "Driver Information",
      4: "Review & Publish"
    };
    return titles[currentStep] || "";
  };

  const submit = async () => {
    setError(null);
    if (!validateAll[1](data) || !validateAll[2](data) || !validateAll[3](data)) {
      setError("Please complete all steps before submitting.");
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
      console.log("Ride created:", body);
      setTimeout(() => {
        navigate("/rides");
      }, 1000);
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : "Failed to submit ride. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-2xl mx-auto py-6 space-y-8"
    >
      <Stepper steps={steps} currentStep={currentStep} />

      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          <div className="mb-6">
            <h2 className="text-2xl font-semibold mb-2">{getStepTitle()}</h2>
            <p className="text-muted-foreground">Step {currentStep} of 4</p>
          </div>
          <div className="p-6 border rounded-xl shadow-sm bg-card">
            {renderStep()}
          </div>
        </motion.div>
      </AnimatePresence>

      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="p-4 border border-red-500 bg-red-50 text-red-700 rounded-lg text-sm"
          >
            {error}
          </motion.div>
        )}
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
            className="bg-white rounded-lg p-6 shadow-lg"
          >
            <p className="font-semibold">Creating your ride...</p>
          </motion.div>
        </motion.div>
      )}

      <div className="flex justify-between gap-4">
        <Button
          variant="secondary"
          onClick={back}
          disabled={currentStep === 1 || loading}
          className="flex-1"
        >
          Back
        </Button>

        {currentStep < 4 ? (
          <Button onClick={next} disabled={loading} className="flex-1">
            Next
          </Button>
        ) : (
          <motion.div
            className="flex-1"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button
              onClick={submit}
              className="w-full bg-green-600 hover:bg-green-700 text-white"
              disabled={loading}
            >
              {loading ? "Publishing..." : "Finish & Publish"}
            </Button>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
