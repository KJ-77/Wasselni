// import the type
import { WizardData } from "./types";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type Props = {
  data: WizardData;
  setData: (data: WizardData) => void;
  currentStep: number;
  getStepTitle: () => string;
};
export default function Step3Payment({ data, setData }: Props) {

  return (
    <Card className="p-6 lg:p-8">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">Vehicle & Pricing</h2>
        <p className="text-muted-foreground">Share your vehicle details and pricing</p>
      </div>

      <form className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Vehicle Information</h3>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="brand">Vehicle Brand *</Label>
              <Input
                id="brand"
                placeholder="e.g., Toyota"
                value={data.vehicle.brand}
                onChange={(e) =>
                  setData({
                    ...data,
                    vehicle: { ...data.vehicle, brand: e.target.value },
                  })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="model">Vehicle Model *</Label>
              <Input
                id="model"
                placeholder="e.g., Camry"
                value={data.vehicle.model}
                onChange={(e) =>
                  setData({
                    ...data,
                    vehicle: { ...data.vehicle, model: e.target.value },
                  })
                }
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="year">Year *</Label>
              <Input
                id="year"
                type="number"
                placeholder="e.g., 2022"
                value={data.vehicle.year}
                onChange={(e) =>
                  setData({
                    ...data,
                    vehicle: { ...data.vehicle, year: e.target.value },
                  })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="seats">Available Seats *</Label>
              <Input
                id="seats"
                type="number"
                placeholder="e.g., 4"
                min="1"
                max="8"
                value={data.vehicle.seats}
                onChange={(e) =>
                  setData({
                    ...data,
                    vehicle: { ...data.vehicle, seats: e.target.value },
                  })
                }
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Vehicle Description (Optional)</Label>
            <textarea
              id="description"
              className="border rounded-md p-2 w-full"
              placeholder="e.g., Clean car, air conditioning, comfortable..."
              rows={3}
              value={data.vehicle.description || ""}
              onChange={(e) =>
                setData({
                  ...data,
                  vehicle: { ...data.vehicle, description: e.target.value },
                })
              }
            />
          </div>
        </div>

        <div className="space-y-4 border-t pt-6">
          <h3 className="text-lg font-semibold">Pricing</h3>

          <div className="space-y-2">
            <Label htmlFor="price-per-seat">Price Per Seat (EGP) *</Label>
            <Input
              id="price-per-seat"
              type="number"
              placeholder="e.g., 150"
              min="0"
              step="5"
              value={data.vehicle.pricePerSeat}
              onChange={(e) =>
                setData({
                  ...data,
                  vehicle: { ...data.vehicle, pricePerSeat: e.target.value },
                })
              }
            />
            <p className="text-sm text-muted-foreground">
              Total for this trip: {data.vehicle.seats && data.vehicle.pricePerSeat 
                ? `EGP ${parseInt(data.vehicle.seats) * parseInt(data.vehicle.pricePerSeat)}` 
                : "N/A"}
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="payment-method">Payment Method *</Label>
            <Select value={data.payment.method} onValueChange={(value) =>
              setData({
                ...data,
                payment: { ...data.payment, method: value },
              })
            }>
              <SelectTrigger id="payment-method">
                <SelectValue placeholder="Select payment method" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="cash">Cash on Pickup</SelectItem>
                <SelectItem value="card">Card</SelectItem>
                <SelectItem value="bank">Bank Transfer</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {data.payment.method === "card" && (
            <div className="space-y-2">
              <Label htmlFor="card-number">Card Number (Optional)</Label>
              <Input
                id="card-number"
                placeholder="XXXX XXXX XXXX XXXX"
                value={data.payment.cardNumber || ""}
                onChange={(e) =>
                  setData({
                    ...data,
                    payment: { ...data.payment, cardNumber: e.target.value },
                  })
                }
              />
            </div>
          )}
        </div>
      </form>
    </Card>
  );
}
