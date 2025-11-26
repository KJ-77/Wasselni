import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

interface StepIndicatorProps {
  id: number;
  title: string;
  active?: boolean;
  completed?: boolean;
  onClick?: (id: number) => void;
}

export default function StepIndicator({
  id,
  title,
  active = false,
  completed = false,
  onClick,
}: StepIndicatorProps) {
  return (
    <div className="flex flex-col items-center">
      <button
        type="button"
        onClick={() => onClick?.(id)}
        disabled={!onClick}
        className={cn(
          "w-10 h-10 flex items-center justify-center rounded-full border transition",
          active
            ? "bg-primary text-primary-foreground border-primary shadow"
            : completed
            ? "bg-green-500 text-white border-green-500"
            : "bg-muted text-muted-foreground border-muted-foreground/30"
        )}
      >
        {completed ? <Check size={18} /> : id}
      </button>

      <span
        className={cn(
          "mt-2 text-sm text-center",
          active ? "text-primary" : completed ? "text-green-600" : "text-muted-foreground"
        )}
      >
        {title}
      </span>
    </div>
  );
}
