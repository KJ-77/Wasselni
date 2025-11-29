import { WizardData } from "./types";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

interface Props {
  currentStep: number;
  data: WizardData;
  getStepTitle: () => string;
  setData: (data: WizardData) => void;
}

export default function Step1CarDetails({
  data,
  setData,
  currentStep,
  getStepTitle,
}: Props) {
  return (
   
    <Card className="w-full p-6 lg:p-8 border border-primary">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">{getStepTitle()}</h2>
        <p className="text-muted-foreground">Step {currentStep} of 4</p>
      </div>
 
      <form className="space-y-6">
        <div className="space-y-6">
          <h3 className="text-xl font-semibold">Trip Details</h3>

          {/* Departure Section */}
          <div className="space-y-4">
            <h4 className="font-medium text-lg">Departure</h4>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="departure-city">Departure City *</Label>
                <Input
                  id="departure-city"
                  placeholder="e.g., Cairo"
                  value={data.ride1.departure?.departureCity || ""}
                  onChange={(e) =>
                    setData({
                      ...data,
                      ride1: {
                        ...data.ride1,
                        departure: {
                          ...data.ride1.departure,
                          departureCity: e.target.value,
                        },
                      },
                    })
                  }
                />
              </div>
              {/* specific location for departure */}
              <div className="space-y-2">
                <Label htmlFor="departure-location">
                  Specific Location (Optional)
                </Label>
                <Input
                  id="departure-location"
                  placeholder="e.g., Downtown Station"
                  value={data.ride1.departure?.specificDepartureLocation || ""}
                  onChange={(e) =>
                    setData({
                      ...data,
                      ride1: {
                        ...data.ride1,
                        departure: {
                          ...data.ride1.departure,
                          specificDepartureLocation: e.target.value,
                        },
                      },
                    })
                  }
                />
              </div>
            </div>

                  {/* departure date and time */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="departure-date">Departure Date *</Label>
                <Input
                  id="departure-date"
                  type="date"
                  value={data.ride1.departure?.departureDate || ""}
                  onChange={(e) =>
                    setData({
                      ...data,
                      ride1: {
                        ...data.ride1,
                        departure: {
                          ...data.ride1.departure,
                          departureDate: e.target.value,
                        },
                      },
                    })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="departure-time">Departure Time *</Label>
                <Input
                  id="departure-time"
                  type="time"
                  value={data.ride1.departure?.departureTime || ""}
                  onChange={(e) =>
                    setData({
                      ...data,
                      ride1: {
                        ...data.ride1,
                        departure: {
                          ...data.ride1.departure,
                          departureTime: e.target.value,
                        },
                      },
                    })
                  }
                />
              </div>
            </div>
          </div>

          {/* Arrival Section */}
          <div className="space-y-4">
            <h4 className="font-medium text-lg">Arrival</h4>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="arrival-city">Arrival City *</Label>
                <Input
                  id="arrival-city"
                  placeholder="e.g., Alexandria"
                  value={data.ride1.arrival?.arrivalCity || ""}
                  onChange={(e) =>
                    setData({
                      ...data,
                      ride1: {
                        ...data.ride1,
                        arrival: {
                          ...data.ride1.arrival,
                          arrivalCity: e.target.value,
                        },
                      },
                    })
                  }
                />
              </div>

              {/* arrival specific location */}
              <div className="space-y-2">
                <Label htmlFor="arrival-location">
                  Specific Location (Optional)
                </Label>
                <Input
                  id="arrival-location"
                  placeholder="e.g., Harbor Area"
                  value={data.ride1.arrival?.specificArrivalLocation || ""}
                  onChange={(e) =>
                    setData({
                      ...data,
                      ride1: {
                        ...data.ride1,
                        arrival: {
                          ...data.ride1.arrival,
                          specificArrivalLocation: e.target.value,
                        },
                      },
                    })
                  }
                />
              </div>
            </div>
          </div>

          {/* Round Trip Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Checkbox
                id="round-trip"
                checked={data.ride1.roundTrip}
                onCheckedChange={(checked) =>
                  setData({
                    ...data,
                    ride1: {
                      ...data.ride1,
                      roundTrip: checked as boolean,
                      roundTripDates: checked
                        ? data.ride1.roundTripDates ?? { departureDate: "", returnDate: "" }
                        : undefined,
                    },
                  })
                }
              />
              <Label htmlFor="round-trip" className="cursor-pointer">
                This is a round trip
              </Label>
            </div>

            {data.ride1.roundTrip && (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 pl-6">
                <div className="space-y-2">
                  <Label htmlFor="return-date">Return Departure Date</Label>
                  <Input
                    id="return-date"
                    type="date"
                    value={data.ride1.roundTripDates?.departureDate || ""}
                    onChange={(e) =>
                      setData({
                        ...data,
                        ride1: {
                          ...data.ride1,
                          roundTripDates: {
                            ...(data.ride1.roundTripDates || { departureDate: "", returnDate: "" }),
                            departureDate: e.target.value,
                          },
                        },
                      })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="return-back-date">Return Date</Label>
                  <Input
                    id="return-back-date"
                    type="date"
                    value={data.ride1.roundTripDates?.returnDate || ""}
                    onChange={(e) =>
                      setData({
                        ...data,
                        ride1: {
                          ...data.ride1,
                          roundTripDates: {
                            ...(data.ride1.roundTripDates || { departureDate: "", returnDate: "" }),
                            returnDate: e.target.value,
                          },
                        },
                      })
                    }
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </form>
    </Card>
  );
}
