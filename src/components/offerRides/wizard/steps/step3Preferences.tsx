import { WizardData } from "./types";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

interface Props {
  data: WizardData;
  setData: (data: WizardData) => void;
}

const amenities = [
  { id: "ac", emoji: "❄️", label: "Air Conditioning" },
  { id: "music", emoji: "🎵", label: "Music" },
  { id: "luggage", emoji: "🧳", label: "Luggage Space" },
  { id: "wifi", emoji: "📶", label: "WiFi" },
  { id: "charger", emoji: "🔌", label: "Phone Charger" },
  { id: "pets", emoji: "🐕", label: "Pets Allowed" },
  { id: "childSeat", emoji: "👶", label: "Child Seat" },
  { id: "noSmoking", emoji: "🚭", label: "No Smoking" },
];

export default function Step3Preferences({ data, setData }: Props) {
  const { preferences } = data;

  const updatePref = (field: keyof typeof preferences, value: any) => {
    setData({
      ...data,
      preferences: { ...preferences, [field]: value },
    });
  };

  const handleAmenityToggle = (amenityId: string) => {
    const newAmenities = preferences.amenities.includes(amenityId)
      ? preferences.amenities.filter((a) => a !== amenityId)
      : [...preferences.amenities, amenityId];
    updatePref("amenities", newAmenities);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Ride Preferences</CardTitle>
        <CardDescription>Set your comfort and passenger preferences</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Amenities */}
        <div>
          <Label className="mb-3 block">Available Amenities</Label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {amenities.map(({ id, emoji, label }) => (
              <Card
                key={id}
                onClick={() => handleAmenityToggle(id)}
                className={cn(
                  "cursor-pointer transition-all text-center",
                  preferences.amenities.includes(id) && "border-primary bg-primary/10"
                )}
              >
                <CardContent className="p-4">
                  <div className="text-2xl mb-1">{emoji}</div>
                  <div className="font-medium text-sm">{label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Passenger Preferences */}
        <Card>
          <CardContent className="p-6 space-y-4">
            <h4 className="font-semibold">Passenger Preferences</h4>
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="instantBooking">Instant Booking</Label>
                <p className="text-sm text-muted-foreground">Let passengers book without approval</p>
              </div>
              <Checkbox id="instantBooking" checked={preferences.instantBooking} onCheckedChange={(c: boolean) => updatePref("instantBooking", c)} />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="womenOnly">Women Only</Label>
                <p className="text-sm text-muted-foreground">Only accept female passengers</p>
              </div>
              <Checkbox id="womenOnly" checked={preferences.womenOnly} onCheckedChange={(c: boolean) => updatePref("womenOnly", c)} />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="verifiedOnly">Verified Users Only</Label>
                <p className="text-sm text-muted-foreground">Only verified riders can book</p>
              </div>
              <Checkbox id="verifiedOnly" checked={preferences.verifiedOnly} onCheckedChange={(c: boolean) => updatePref("verifiedOnly", c)} />
            </div>
            <div>
              <Label htmlFor="minRating" className="mb-2 block">Minimum Passenger Rating</Label>
              <Select onValueChange={(v) => updatePref("minRating", Number(v))} defaultValue={String(preferences.minRating)}>
                <SelectTrigger>
                  <SelectValue placeholder="Any Rating" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0">Any Rating</SelectItem>
                  <SelectItem value="4.0">⭐ 4.0+</SelectItem>
                  <SelectItem value="4.5">⭐ 4.5+</SelectItem>
                  <SelectItem value="4.8">⭐ 4.8+</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Additional Notes */}
        <div>
          <Label htmlFor="additionalNotes">Additional Notes (Optional)</Label>
          <Textarea
            id="additionalNotes"
            placeholder="Share any additional information about your ride (e.g., 'Happy to help with luggage', 'Prefer quiet passengers', 'Taking scenic route')"
            value={preferences.additionalNotes}
            onChange={(e) => updatePref("additionalNotes", e.target.value)}
          />
           <p className="text-xs text-muted-foreground mt-2">💡 Friendly notes can help attract the right passengers!</p>
        </div>
      </CardContent>
    </Card>
  );
}
