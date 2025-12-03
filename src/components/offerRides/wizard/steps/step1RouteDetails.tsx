import { WizardData, Stop } from "./types";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Plus, X, MapPin, Trash2 } from "lucide-react";
import { AddressAutocomplete } from "@/components/AddressAutocomplete";
import MapboxMap from "@/components/map";
import { AutocompleteResponse } from "@/services/MapService";

interface Props {
  data: WizardData;
  setData: (data: WizardData) => void;
}

export default function Step1RouteDetails({ data, setData }: Props) {
  const { routeDetails } = data;

  const handlePlaceSelect = (field: "departure" | "arrival", place: AutocompleteResponse) => {
    const city = place.address;
    const coordinates = { lat: place.lat, lng: place.lng };

    if (field === "departure") {
      setData({
        ...data,
        routeDetails: {
          ...routeDetails,
          departureCity: city,
          departureCoordinates: coordinates,
        },
      });
    } else {
      setData({
        ...data,
        routeDetails: {
          ...routeDetails,
          arrivalCity: city,
          arrivalCoordinates: coordinates,
        },
      });
    }
  };

  const handleSpecificPlaceSelect = (field: "departure" | "arrival", place: AutocompleteResponse) => {
    const address = place.address;
    const coordinates = { lat: place.lat, lng: place.lng };

    if (field === "departure") {
      setData({
        ...data,
        routeDetails: {
          ...routeDetails,
          departureAddress: address,
          departureCoordinates: coordinates,
        },
      });
    } else {
      setData({
        ...data,
        routeDetails: {
          ...routeDetails,
          arrivalAddress: address,
          arrivalCoordinates: coordinates,
        },
      });
    }
  };

  const updateField = (field: keyof typeof routeDetails, value: string | boolean | Stop[]) => {
    setData({
      ...data,
      routeDetails: { ...routeDetails, [field]: value },
    });
  };

  const handleAddStop = () => {
    if ((routeDetails.stops?.length || 0) < 3) {
      const newStop: Stop = { id: Date.now(), location: "" };
      setData({
        ...data,
        routeDetails: {
          ...routeDetails,
          stops: [...(routeDetails.stops || []), newStop],
        },
      });
    }
  };

  const handleRemoveStop = (id: number) => {
    setData({
      ...data,
      routeDetails: {
        ...routeDetails,
        stops: (routeDetails.stops || []).filter((stop) => stop.id !== id),
      },
    });
  };


  const handleStopPlaceSelect = (id: number, place: AutocompleteResponse) => {
    const updatedStops = (routeDetails.stops || []).map((stop) =>
      stop.id === id 
        ? { 
            ...stop, 
            location: place.address,
            coordinates: { lat: place.lat, lng: place.lng }
          } 
        : stop
    );
    setData({
      ...data,
      routeDetails: { ...routeDetails, stops: updatedStops },
    });
  };

  const clearMap = () => {
    setData({
      ...data,
      routeDetails: {
        ...routeDetails,
        departureCoordinates: undefined,
        arrivalCoordinates: undefined,
      },
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Where are you going?</CardTitle>
        <CardDescription>Tell us about your journey</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Departure & Arrival */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="departureCity">Departure City *</Label>
            <AddressAutocomplete
              onPlaceSelected={(place) => handlePlaceSelect("departure", place)}
              defaultValue={routeDetails.departureCity || ""}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="departureAddress">Specific Location</Label>
            <AddressAutocomplete
              onPlaceSelected={(place) => handleSpecificPlaceSelect("departure", place)}
              defaultValue={routeDetails.departureAddress || ""}
              placeholder="e.g., Hamra Street"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="arrivalCity">Destination City *</Label>
            <AddressAutocomplete
              onPlaceSelected={(place) => handlePlaceSelect("arrival", place)}
              defaultValue={routeDetails.arrivalCity || ""}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="arrivalAddress">Specific Location</Label>
            <AddressAutocomplete
              onPlaceSelected={(place) => handleSpecificPlaceSelect("arrival", place)}
              defaultValue={routeDetails.arrivalAddress || ""}
              placeholder="e.g., City Center"
            />
          </div>
        </div>
        
        {/* Date & Time */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="departureDate">Departure Date *</Label>
            <Input 
              id="departureDate" 
              type="date" 
              value={routeDetails.departureDate || ""} 
              onChange={(e) => updateField("departureDate", e.target.value)} 
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="departureTime">Departure Time *</Label>
            <Input 
              id="departureTime" 
              type="time" 
              value={routeDetails.departureTime || ""} 
              onChange={(e) => updateField("departureTime", e.target.value)} 
            />
          </div>
        </div>

        {/* Round Trip */}
        <Card className="bg-muted/40">
            <div className="p-4 flex items-center justify-between">
                <div>
                    <h4 className="font-medium">Round Trip</h4>
                    <p className="text-sm text-muted-foreground">Offer a return journey</p>
                </div>
                <Checkbox 
                  checked={routeDetails.isRoundTrip || false} 
                  onCheckedChange={(checked: boolean) => updateField("isRoundTrip", checked)} 
                />
            </div>
        </Card>

        {routeDetails.isRoundTrip && (
            <div className="space-y-6 border-l-4 border-green-600 pl-6 ml-4">
                 <h4 className="font-semibold text-green-600">Return Journey Details</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <Label htmlFor="returnDate">Return Date *</Label>
                        <Input 
                          id="returnDate" 
                          type="date" 
                          value={routeDetails.returnDate || ""} 
                          onChange={(e) => updateField("returnDate", e.target.value)} 
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="returnTime">Return Time *</Label>
                        <Input 
                          id="returnTime" 
                          type="time" 
                          value={routeDetails.returnTime || ""} 
                          onChange={(e) => updateField("returnTime", e.target.value)} 
                        />
                    </div>
                </div>
            </div>
        )}

        {/* Additional Stops */}
        <div>
          <Label className="mb-2 block">Additional Stops (Optional)</Label>
          <div className="space-y-3">
            {routeDetails.stops && routeDetails.stops.map((stop, index) => (
              <div key={stop.id} className="flex items-center space-x-2">
                <div className="flex-1">
                  <AddressAutocomplete
                    onPlaceSelected={(place) => handleStopPlaceSelect(stop.id, place)}
                    defaultValue={stop.location || ""}
                    placeholder={`Stop ${index + 1} location`}
                  />
                </div>
                <Button variant="ghost" size="icon" onClick={() => handleRemoveStop(stop.id)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
          <Button 
            type="button" 
            variant="outline" 
            size="sm" 
            className="mt-3" 
            onClick={handleAddStop} 
            disabled={(routeDetails.stops?.length || 0) >= 3}
          >
            <Plus className="w-4 h-4 mr-2" /> Add Stop
          </Button>
        </div>

        {/* Map Section */}
        <Card className="bg-gradient-to-br from-blue-50 to-green-50">
          <CardHeader>
            <div className="flex items-center justify-between">
                <div>
                    <CardTitle className="flex items-center">
                      <MapPin className="w-5 h-5 mr-2 text-blue-600" /> Set Your Route on Map
                    </CardTitle>
                    <CardDescription className="mt-1">
                      Select your departure and arrival locations above to see the route on the map.
                    </CardDescription>
                </div>
                <Button type="button" variant="outline" size="sm" onClick={clearMap}>
                    <Trash2 className="w-4 h-4 mr-2" /> Clear Route
                </Button>
            </div>
          </CardHeader>
          <CardContent>
            <MapboxMap
              origin={routeDetails.departureCoordinates}
              destination={routeDetails.arrivalCoordinates}
              className="h-[400px] w-full rounded-md"
            />
          </CardContent>
        </Card>
      </CardContent>
    </Card>
  );
}
