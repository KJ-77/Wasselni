import { cn } from "@/lib/utils";

interface StepConnectorProps {
  completed?: boolean; // if true → green, if false → muted
}

export default function StepConnector({ completed = false }: StepConnectorProps) {
  return (
    <div
      className={cn(
        "w-30 h-[3px] ml-6 -mr-16 mb-2  rounded-full transition-all duration-300 items-center ",
        completed ? "bg-green-500" : "bg-muted-foreground/30"
      )}
    />
  );
}
