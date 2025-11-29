// import the type
import { WizardData } from "./types";
import { Card } from "@/components/ui/card";

type Props = {
  data: WizardData;
  setData: (data: WizardData) => void;
  currentStep: number;
  getStepTitle: () => string;
};


export default function Step4Summary({ data }: Props) {
  return (
    <Card className="p-6 lg:p-8">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">Review Your Ride</h2>
        <p className="text-muted-foreground">Please verify all details before publishing</p>
      </div>

      <div className="space-y-6">
        {/* Trip Details */}
        <div className="border-b pb-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <span className="text-blue-600">📍</span> Trip Details
          </h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-muted-foreground">From</p>
              <p className="font-medium">
                {data.ride1.departure?.departureCity || "Not specified"}
              </p>
              {data.ride1.departure?.specificDepartureLocation && (
                <p className="text-xs text-muted-foreground">
                  {data.ride1.departure.specificDepartureLocation}
                </p>
              )}
            </div>
            <div>
              <p className="text-muted-foreground">To</p>
              <p className="font-medium">
                {data.ride1.arrival?.arrivalCity || "Not specified"}
              </p>
              {data.ride1.arrival?.specificArrivalLocation && (
                <p className="text-xs text-muted-foreground">
                  {data.ride1.arrival.specificArrivalLocation}
                </p>
              )}
            </div>

            <div>
              <p className="text-muted-foreground">Departure</p>
              <p className="font-medium">
                {data.ride1.departure?.departureDate} at {data.ride1.departure?.departureTime}
              </p>
            </div>

            {data.ride1.roundTrip && data.ride1.roundTripDates && (
              <div>
                <p className="text-muted-foreground">Return</p>
                <p className="font-medium">
                  {data.ride1.roundTripDates.returnDate}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Vehicle Details */}
        <div className="border-b pb-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <span className="text-purple-600">🚗</span> Vehicle Details
          </h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-muted-foreground">Vehicle</p>
              <p className="font-medium">
                {data.vehicle.brand} {data.vehicle.model} ({data.vehicle.year})
              </p>
            </div>
            <div>
              <p className="text-muted-foreground">Available Seats</p>
              <p className="font-medium">{data.vehicle.seats} seats</p>
            </div>

            {data.vehicle.description && (
              <div className="col-span-2">
                <p className="text-muted-foreground">Description</p>
                <p className="text-sm">{data.vehicle.description}</p>
              </div>
            )}
          </div>
        </div>

        {/* Driver Details */}
        <div className="border-b pb-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <span className="text-green-600">👤</span> Driver Information
          </h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-muted-foreground">Name</p>
              <p className="font-medium">{data.driver.fullName || "Not specified"}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Phone</p>
              <p className="font-medium">{data.driver.phone || "Not specified"}</p>
            </div>
            <div className="col-span-2">
              <p className="text-muted-foreground">Email</p>
              <p className="font-medium">{data.driver.email || "Not specified"}</p>
            </div>
          </div>
        </div>

        {/* Pricing Details */}
        <div>
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <span className="text-orange-600">💰</span> Pricing & Payment
          </h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-muted-foreground">Price Per Seat</p>
              <p className="font-medium">EGP {data.vehicle.pricePerSeat || "0"}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Total Revenue</p>
              <p className="font-semibold text-lg text-green-600">
                EGP {
                  data.vehicle.seats && data.vehicle.pricePerSeat
                    ? parseInt(data.vehicle.seats) * parseInt(data.vehicle.pricePerSeat)
                    : "0"
                }
              </p>
            </div>

            <div className="col-span-2">
              <p className="text-muted-foreground">Payment Method</p>
              <p className="font-medium capitalize">
                {data.payment.method === "cash" 
                  ? "Cash on Pickup"
                  : data.payment.method === "card"
                  ? "Card"
                  : "Bank Transfer"}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-6">
          <p className="text-sm text-blue-900">
            ✓ Review all details carefully. Once published, passengers can book this ride immediately.
          </p>
        </div>
      </div>
    </Card>
  );
}
