import { WizardData } from "./types";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Plus, X, MapPin, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";
import { MapContainer as LeafletMapContainer, TileLayer, Marker, useMapEvents, Polyline } from "react-leaflet";
import L from "leaflet";

// Leaflet's default icon breaks with React, so we fix it
const defaultIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});
L.Marker.prototype.options.icon = defaultIcon;

interface Props {
  data: WizardData;
  setData: (data: WizardData) => void;
}

// Map component that handles map events
type MapEventsProps = {
  onMapClick: (latlng: L.LatLng) => void;
};

function MapEvents({ onMapClick }: MapEventsProps) {
  useMapEvents({
    click(e) {
      onMapClick(e.latlng);
    },
  });
  return null;
}

export default function Step1RouteDetails({ data, setData }: Props) {
  const { routeDetails } = data;
  const [isClient, setIsClient] = useState(false);

  const [departureMarker, setDepartureMarker] = useState<L.LatLng | null>(null);
  const [destinationMarker, setDestinationMarker] = useState<L.LatLng | null>(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleMapClick = (latlng: L.LatLng) => {
    if (!departureMarker) {
      setDepartureMarker(latlng);
      // In a real app, you'd use a geocoding service here
      setData({ ...data, routeDetails: { ...routeDetails, departureCity: `Lat: ${latlng.lat.toFixed(2)}` }});
    } else if (!destinationMarker) {
      setDestinationMarker(latlng);
      setData({ ...data, routeDetails: { ...routeDetails, arrivalCity: `Lat: ${latlng.lat.toFixed(2)}` }});
    }
  };

  const clearMap = () => {
    setDepartureMarker(null);
    setDestinationMarker(null);
  };

  const handleAddStop = () => {
    if (routeDetails.stops.length < 3) {
      const newStop = { id: Date.now(), location: "" };
      setData({
        ...data,
        routeDetails: {
          ...routeDetails,
          stops: [...routeDetails.stops, newStop],
        },
      });
    }
  };

  const handleRemoveStop = (id: number) => {
    setData({
      ...data,
      routeDetails: {
        ...routeDetails,
        stops: routeDetails.stops.filter((stop) => stop.id !== id),
      },
    });
  };

  const handleStopChange = (id: number, value: string) => {
    const updatedStops = routeDetails.stops.map((stop) =>
      stop.id === id ? { ...stop, location: value } : stop
    );
    setData({
      ...data,
      routeDetails: { ...routeDetails, stops: updatedStops },
    });
  };

  const updateField = (field: keyof typeof routeDetails, value: any) => {
    setData({
      ...data,
      routeDetails: { ...routeDetails, [field]: value },
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
            <Input id="departureCity" placeholder="e.g., Beirut" value={routeDetails.departureCity} onChange={(e) => updateField("departureCity", e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="departureAddress">Specific Location</Label>
            <Input id="departureAddress" placeholder="e.g., Hamra Street" value={routeDetails.departureAddress} onChange={(e) => updateField("departureAddress", e.target.value)} />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="arrivalCity">Destination City *</Label>
            <Input id="arrivalCity" placeholder="e.g., Tripoli" value={routeDetails.arrivalCity} onChange={(e) => updateField("arrivalCity", e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="arrivalAddress">Specific Location</Label>
            <Input id="arrivalAddress" placeholder="e.g., City Center" value={routeDetails.arrivalAddress} onChange={(e) => updateField("arrivalAddress", e.target.value)} />
          </div>
        </div>
        
        {/* Date & Time */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="departureDate">Departure Date *</Label>
            <Input id="departureDate" type="date" value={routeDetails.departureDate} onChange={(e) => updateField("departureDate", e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="departureTime">Departure Time *</Label>
            <Input id="departureTime" type="time" value={routeDetails.departureTime} onChange={(e) => updateField("departureTime", e.target.value)} />
          </div>
        </div>

        {/* Round Trip */}
        <Card className="bg-muted/40">
            <div className="p-4 flex items-center justify-between">
                <div>
                    <h4 className="font-medium">Round Trip</h4>
                    <p className="text-sm text-muted-foreground">Offer a return journey</p>
                </div>
                <Checkbox checked={routeDetails.isRoundTrip} onCheckedChange={(checked: boolean) => updateField("isRoundTrip", checked)} />
            </div>
        </Card>

        {routeDetails.isRoundTrip && (
            <div className="space-y-6 border-l-4 border-green-600 pl-6 ml-4">
                 <h4 className="font-semibold text-green-600">Return Journey Details</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <Label htmlFor="returnDate">Return Date *</Label>
                        <Input id="returnDate" type="date" value={routeDetails.returnDate} onChange={(e) => updateField("returnDate", e.target.value)} />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="returnTime">Return Time *</Label>
                        <Input id="returnTime" type="time" value={routeDetails.returnTime} onChange={(e) => updateField("returnTime", e.target.value)} />
                    </div>
                </div>
            </div>
        )}

        {/* Additional Stops */}
        <div>
          <Label className="mb-2 block">Additional Stops (Optional)</Label>
          <div className="space-y-3">
            {routeDetails.stops.map((stop, index) => (
              <div key={stop.id} className="flex items-center space-x-2">
                <Input placeholder={`Stop ${index + 1} location`} value={stop.location} onChange={(e) => handleStopChange(stop.id, e.target.value)} />
                <Button variant="ghost" size="icon" onClick={() => handleRemoveStop(stop.id)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
          <Button type="button" variant="outline" size="sm" className="mt-3" onClick={handleAddStop} disabled={routeDetails.stops.length >= 3}>
            <Plus className="w-4 h-4 mr-2" /> Add Stop
          </Button>
        </div>

        {/* Map Section */}
        <Card className="bg-gradient-to-br from-blue-50 to-green-50">
          <CardHeader>
            <div className="flex items-center justify-between">
                <div>
                    <CardTitle className="flex items-center"><MapPin className="w-5 h-5 mr-2 text-wasselni-blue" /> Set Your Route on Map</CardTitle>
                    <CardDescription className="mt-1">Click on the map to add your departure and destination points</CardDescription>
                </div>
                <Button type="button" variant="outline" size="sm" onClick={clearMap}>
                    <Trash2 className="w-4 h-4 mr-2" /> Clear Route
                </Button>
            </div>
          </CardHeader>
          <CardContent>
            {isClient ? (
                <LeafletMapContainer center={[33.8547, 35.8623]} zoom={9} style={{ height: "400px", width: "100%", borderRadius: "0.5rem", zIndex: 1 }}>
                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution="&copy; OpenStreetMap contributors" />
                    <MapEvents onMapClick={handleMapClick} />
                    {departureMarker && <Marker position={departureMarker} />}
                    {destinationMarker && <Marker position={destinationMarker} />}
                    {departureMarker && destinationMarker && <Polyline positions={[departureMarker, destinationMarker]} color={"#059669"} dashArray={"10, 10"} />}
                </LeafletMapContainer>
            ) : (
              <div style={{ height: "400px", width: "100%", backgroundColor: "#e0e0e0", display: "flex", alignItems: "center", justifyContent: "center" }}>Loading Map...</div>
            )}
          </CardContent>
        </Card>
      </CardContent>
    </Card>
  );
}
