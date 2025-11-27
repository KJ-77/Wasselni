import OptionForm from "@/components/optionForm";
import { Button } from "@/components/ui/button";
import { EyeOff, Eye, Bell } from "lucide-react";

type Props = {
  mapVisible: boolean;
  onToggleMap: () => void;
  resultsCount?: number | null;
  onSearch?: (payload?: any) => void;
};

export default function SearchBar({ mapVisible, onToggleMap, resultsCount = null }: Props) {
  return (
    <div className="w-full mb-6 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="bg-[var(--color-card)] rounded-2xl p-4 shadow-sm flex flex-col md:flex-row items-center gap-4">
          {/* left: OptionForm (From/To/Date) */}
          <div className="flex-1 w-full">
            {/* OptionForm should call a callback (onSearch) internally or you can read its state externally.
                Here we simply render it—adapt as needed. */}
            <OptionForm  />
          </div>

          {/* right: small actions */}
          <div className="flex items-center gap-3">
            <div className="text-sm text-muted-foreground hidden md:block">
              {resultsCount !== null ? `${resultsCount} rides found` : ""}
            </div>

            <Button
              variant="outline"
              className="hidden md:inline-flex items-center gap-2"
              onClick={() => {
                // price alerts or other
                // you can wire to a modal or page
                // placeholder - open price alert
                // TODO: implement price alert
              }}
            >
              <Bell className="w-4 h-4" /> Set Price Alert
            </Button>

            <Button
              variant="ghost"
              className="px-3"
              onClick={onToggleMap}
              aria-pressed={mapVisible}
            >
              {mapVisible ? <><EyeOff className="w-4 h-4 mr-2" /> Hide Map</> : <><Eye className="w-4 h-4 mr-2" /> Show Map</>}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}