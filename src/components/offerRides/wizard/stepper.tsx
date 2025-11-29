import StepIndicator from "./stepIndicator";
import StepConnector from "./stepConnector";

interface Step {
  id: number;
  title: string;
  completed: boolean;
}

interface StepperProps {
  steps: Step[];
  currentStep: number; // 1–4
}

export default function Stepper({ steps, currentStep }: StepperProps) {
  return (
    <div className="flex items-center justify-center gap-12 w-full py-6">
      {steps.map((step, index) => {
        const isActive = currentStep === step.id;
        const isCompleted = step.completed;

        return (
          <div key={step.id} className="flex items-center">
            {/* Step bubble */}
            <StepIndicator
              id={step.id}
              title={step.title}
              active={isActive}
              completed={isCompleted}
            />

            {/* Connector (except after last step) */}
            {index < steps.length - 1 && (
              <div className="px-2">
                <StepConnector completed={steps[index].completed} />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
