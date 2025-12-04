import { WizardData, Vehicle } from "./types";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Plus, DollarSign } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props {
  data: WizardData;
  setData: (data: WizardData) => void;
  vehicles: Vehicle[];
  onOpenAddVehicleModal: () => void;
}

export default function Step2VehicleAndPricing({ data, setData, vehicles, onOpenAddVehicleModal }: Props) {
  const { vehicleAndPricing } = data;

  const updateField = (field: keyof typeof vehicleAndPricing, value: any) => {
    setData({
      ...data,
      vehicleAndPricing: { ...vehicleAndPricing, [field]: value },
    });
  };

  const selectedVehicle = vehicles.find(v => v.id === vehicleAndPricing.selectedVehicleId);
  const estimatedEarnings = (vehicleAndPricing.pricePerSeat || 0) * (vehicleAndPricing.availableSeats || 0);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Vehicle & Pricing</CardTitle>
        <CardDescription>Select your vehicle and set your price</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <Label className="mb-3 block">Select Your Vehicle *</Label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            {vehicles.map((vehicle) => (
              <Card
                key={vehicle.id}
                onClick={() => updateField("selectedVehicleId", vehicle.id)}
                className={cn(
                  "cursor-pointer transition-all",
                  vehicleAndPricing.selectedVehicleId === vehicle.id && "border-primary"
                )}
              >
                <CardContent className="p-4 flex items-center space-x-4">
                  <img src={vehicle.photo} alt={vehicle.model} className="w-20 h-20 rounded-lg object-cover border" />
                  <div className="flex-1">
                    <h4 className="font-semibold">{vehicle.make} {vehicle.model}</h4>
                    <p className="text-sm text-muted-foreground">{vehicle.color} • {vehicle.year}</p>
                    <p className="text-sm text-muted-foreground">Plate: {vehicle.plate}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <Button type="button" variant="outline" className="w-full" onClick={onOpenAddVehicleModal}>
            <Plus className="w-5 h-5 mr-2" /> Add New Vehicle
          </Button>
        </div>

        {selectedVehicle && (
          <div id="availableSeatsSection">
            <Label htmlFor="availableSeats" className="mb-2 block">Available Seats for This Ride *</Label>
            <Select onValueChange={(val) => updateField("availableSeats", Number(val))} defaultValue={vehicleAndPricing.availableSeats > 0 ? String(vehicleAndPricing.availableSeats) : undefined}>
              <SelectTrigger>
                <SelectValue placeholder="Select seats" />
              </SelectTrigger>
              <SelectContent>
                {[...Array(selectedVehicle.capacity).keys()].map(i => (
                  <SelectItem key={i + 1} value={String(i + 1)}>{i + 1} seat{i > 0 ? 's' : ''}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground mt-2">💡 Leaving one seat empty makes the ride more comfortable</p>
          </div>
        )}

        <Card className="bg-gradient-to-br from-green-50 to-blue-50">
          <CardHeader>
             <CardTitle className="flex items-center"><DollarSign className="w-5 h-5 mr-2 text-green-600" /> Set Your Price</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Price Type *</Label>
              <RadioGroup
                value={vehicleAndPricing.priceType || "fixed"}
                onValueChange={(value) => updateField("priceType", value as "fixed" | "per_distance")}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="fixed" id="fixed" />
                  <Label htmlFor="fixed" className="font-normal cursor-pointer">
                    Fixed Price (total for the ride)
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="per_distance" id="per_distance" />
                  <Label htmlFor="per_distance" className="font-normal cursor-pointer">
                    Per Distance (calculated per km)
                  </Label>
                </div>
              </RadioGroup>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <Label htmlFor="pricePerSeat">Price per Seat (USD) *</Label>
                    <div className="relative">
                        <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input type="number" id="pricePerSeat" className="pl-8" placeholder="8.00" min="1" step="0.50" value={vehicleAndPricing.pricePerSeat || ''} onChange={e => updateField("pricePerSeat", Number(e.target.value))} />
                    </div>
                </div>
                <div>
                    <Label>Estimated Earnings</Label>
                    <div className="h-10 px-3 flex items-center bg-background rounded-md border">
                        <span className="font-semibold text-green-600">${estimatedEarnings.toFixed(2)}</span>
                        <span className="text-xs text-muted-foreground ml-2">(if all seats filled)</span>
                    </div>
                </div>
            </div>
            <div className="mt-4 p-3 bg-background/60 rounded-md">
                <p className="text-sm text-muted-foreground">💡 <strong>Pricing Tip:</strong> Similar routes average $8-12 per seat. Lower prices fill faster!</p>
            </div>
          </CardContent>
        </Card>
      </CardContent>
    </Card>
  );
}
