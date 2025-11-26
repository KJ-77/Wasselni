import { cn } from "@/lib/utils";

interface StepConnectorProps {
  completed?: boolean; // if true → green, if false → muted
}

export default function StepConnector({ completed = false }: StepConnectorProps) {
  return (
    <div
      className={cn(
        "w-12 h-[2.5px] rounded-full transition-all duration-300",
        completed ? "bg-green-500" : "bg-muted"
      )}
    />
  );
}
