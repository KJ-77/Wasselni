import { WizardData, Vehicle } from "./types";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { CheckedState } from "@radix-ui/react-checkbox";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

interface Props {
  data: WizardData;
  setData: (data: WizardData) => void;
  vehicles: Vehicle[];
}

export default function Step4ReviewAndPublish({ data, setData, vehicles }: Props) {
  const { publishing, routeDetails, vehicleAndPricing, preferences } = data;

  const selectedVehicle = vehicles.find(v => v.id === vehicleAndPricing.selectedVehicleId);

  const updatePub = (field: keyof typeof publishing, value: any) => {
    setData({
      ...data,
      publishing: { ...publishing, [field]: value },
    });
  };

  const getPreviewDate = () => {
    try {
        const date = new Date(`${routeDetails.departureDate}T${routeDetails.departureTime}`);
        return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }) + " " + date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
    } catch(e) {
        return "Invalid Date";
    }
  }

  return (
    <Card>
        <CardHeader>
            <CardTitle>Review Your Ride</CardTitle>
            <CardDescription>Make sure everything looks good before publishing</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
            {/* Preview Card */}
            <div className="card border-2 border-primary/20">
                <div className="bg-gradient-to-r from-blue-600 to-green-600 text-white px-4 py-2 text-xs font-medium rounded-t-lg">
                    👁️ Your Ride Preview
                </div>
                <div className="p-6">
                    <div className="flex items-start justify-between mb-6">
                        <div className="flex items-center space-x-4">
                            <Avatar className="w-14 h-14">
                                <AvatarFallback className="text-lg font-bold">AM</AvatarFallback>
                            </Avatar>
                            <div>
                                <h3 className="font-semibold text-lg">Ahmad M.</h3>
                                <div className="flex items-center space-x-1 text-sm">
                                    <span>⭐</span> <span className="font-medium">4.9</span> <span className="text-muted-foreground">(127 trips)</span>
                                </div>
                            </div>
                        </div>
                        <div className="text-right">
                            <div className="text-3xl font-bold text-green-600">${vehicleAndPricing.pricePerSeat || 0}</div>
                            <div className="text-xs text-muted-foreground">per person</div>
                        </div>
                    </div>
                    {/* Route Preview */}
                    <div className="bg-muted/40 rounded-lg p-4 mb-4">
                        <div className="flex items-start space-x-3">
                            <div className="flex flex-col items-center pt-1">
                                <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                                <div className="w-0.5 h-16 bg-gradient-to-b from-blue-600 via-gray-300 to-orange-500"></div>
                                <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                            </div>
                            <div className="flex-1 space-y-4">
                                <div>
                                    <div className="flex items-center justify-between">
                                        <div className="font-medium">{routeDetails.departureCity || "Departure"}</div>
                                        <div className="text-sm font-medium">{getPreviewDate()}</div>
                                    </div>
                                </div>
                                <div className="flex items-center justify-center">
                                    <Badge variant="outline">{vehicleAndPricing.availableSeats || 0} seats available</Badge>
                                </div>
                                <div>
                                    <div className="font-medium">{routeDetails.arrivalCity || "Arrival"}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Vehicle/Amenities Preview */}
                     <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <span className="font-medium text-foreground">
                            {selectedVehicle ? `🚗 ${selectedVehicle.make} ${selectedVehicle.model}` : 'No vehicle selected'}
                        </span>
                        <span>• {preferences.amenities.length > 0 ? preferences.amenities.map(a => a.charAt(0).toUpperCase() + a.slice(1)).join(' • ') : 'No amenities'}</span>
                    </div>
                </div>
            </div>

            {/* Publishing Options */}
            <Card>
                <CardHeader><CardTitle className="text-lg">Publishing Options</CardTitle></CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <Label htmlFor="featuredRide">List as Featured Ride</Label>
                            <p className="text-sm text-muted-foreground">Boost visibility by 3x (Additional $1 fee)</p>
                        </div>
                        <Checkbox id="featuredRide" checked={publishing.featuredRide} onCheckedChange={(c: boolean) => updatePub("featuredRide", c)} />
                    </div>
                     <div className="flex items-center justify-between">
                        <div>
                            <Label htmlFor="recurringRide">Recurring Ride</Label>
                            <p className="text-sm text-muted-foreground">Automatically post this ride weekly</p>
                        </div>
                        <Checkbox id="recurringRide" checked={publishing.recurringRide} onCheckedChange={(c: boolean) => updatePub("recurringRide", c)} />
                    </div>
                                        {/* When recurringRide is enabled, show recurrence options */}
                                        {publishing.recurringRide && (
                                            <div className="mt-4 grid grid-cols-1 gap-4">
                                                <div>
                                                    <Label>Frequency</Label>
                                                    <select className="w-full rounded-md border p-2" value={publishing.recurrenceFrequency || 'weekly'} onChange={(e) => updatePub('recurrenceFrequency', e.target.value as 'daily' | 'weekly' | 'monthly')}>
                                                        <option value="daily">Daily</option>
                                                        <option value="weekly">Weekly</option>
                                                        <option value="monthly">Monthly</option>
                                                    </select>
                                                </div>
                                                <div>
                                                    <Label>Repeat On (for weekly)</Label>
                                                    <div className="grid grid-cols-7 gap-2 mt-2">
                                                        {['S','M','T','W','T','F','S'].map((d, i) => (
                                                            <button type="button" key={i} onClick={() => {
                                                                const days = (publishing.recurrenceDays || []) as string[];
                                                                const label = String(i);
                                                                const next = days.includes(label) ? days.filter(x => x !== label) : [...days, label];
                                                                updatePub('recurrenceDays', next);
                                                            }} className={`h-8 w-8 rounded ${((publishing.recurrenceDays || []) as string[]).includes(String(i)) ? 'bg-primary text-white' : 'bg-muted/30'}`}>
                                                                {d}
                                                            </button>
                                                        ))}
                                                    </div>
                                                </div>
                                                <div>
                                                    <Label>End Date (optional)</Label>
                                                    <input type="date" className="w-full rounded-md border p-2" value={publishing.recurrenceEnd || ''} onChange={(e) => updatePub('recurrenceEnd', e.target.value)} />
                                                </div>
                                            </div>
                                        )}
                </CardContent>
            </Card>

            {/* Terms Agreement */}
            <Card className="bg-muted/40">
                <CardContent className="p-6">
                    <div className="flex items-start space-x-3">
                        <Checkbox id="agreeTerms" checked={publishing.agreeTerms} onCheckedChange={(c: CheckedState) => updatePub("agreeTerms", Boolean(c))} />
                        <div className="grid gap-1.5 leading-none">
                            <label htmlFor="agreeTerms" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                I agree to the terms and conditions
                            </label>
                            <p className="text-sm text-muted-foreground">
                                By publishing, you agree to our <a href="#" className="text-primary hover:underline">Community Guidelines</a> and <a href="#" className="text-primary hover:underline">Cancellation Policy</a>.
                            </p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </CardContent>
    </Card>
  );
}
