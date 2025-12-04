import * as React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { X, PlusCircle } from "lucide-react";
import { toast } from "sonner";


type TripData = {
    title: string;
    description: string;
    coverImageUrl: string;
    date: string;
    seats: number;
    price: number;
    stops: string[];
};

const initialState: TripData = {
    title: "",
    description: "",
    coverImageUrl: "",
    date: "",
    seats: 10,
    price: 20,
    stops: [],
};

export function OfferTouristicTripsPage() {
    const [tripData, setTripData] = React.useState<TripData>(initialState);
    const [newStop, setNewStop] = React.useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target;
        // Coerce numeric fields
        if (id === 'seats' || id === 'price') {
            const num = Number(value);
            setTripData(prev => ({ ...prev, [id]: isNaN(num) ? 0 : num } as unknown as TripData));
            return;
        }
        setTripData(prev => ({ ...prev, [id]: value } as unknown as TripData));
    };

    const handleAddStop = () => {
        if (newStop && !tripData.stops.includes(newStop)) {
            setTripData(prev => ({ ...prev, stops: [...prev.stops, newStop] }));
            setNewStop("");
        }
    };

    const handleRemoveStop = (stopToRemove: string) => {
        setTripData(prev => ({
            ...prev,
            stops: prev.stops.filter(stop => stop !== stopToRemove)
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Trip Data Submitted:", tripData);
        toast.success("Trip has been published successfully!", {
            description: `Your trip "${tripData.title}" is now live for bookings.`,
        });
        // Here you would typically send the data to a backend API
        // For now, we just log it and reset the form
        setTripData(initialState);
    };

    return (
        <div className="container mx-auto px-4 py-20 md:py-24">
            <Card className="max-w-3xl mx-auto">
                <CardHeader>
                    <CardTitle className="text-3xl font-bold">Create a New Touristic Trip</CardTitle>
                    <CardDescription>
                        Fill out the details below to offer a new trip to the Wasselni community.
                    </CardDescription>
                </CardHeader>
                <form onSubmit={handleSubmit}>
                    <CardContent className="space-y-6">
                        {/* Trip Info */}
                        <div className="space-y-2">
                            <Label htmlFor="title" className="text-lg font-semibold">Trip Title</Label>
                            <Input id="title" placeholder="e.g., Historical Journey Through North Lebanon" value={tripData.title} onChange={handleChange} required />
                        </div>
                         <div className="space-y-2">
                            <Label htmlFor="description" className="text-lg font-semibold">Trip Description</Label>
                            <Textarea id="description" placeholder="Describe the experience, what's included, and what makes this trip special." value={tripData.description} onChange={handleChange} required />
                        </div>
                         <div className="space-y-2">
                            <Label htmlFor="coverImageUrl" className="text-lg font-semibold">Cover Image URL</Label>
                            <Input id="coverImageUrl" placeholder="https://images.unsplash.com/..." value={tripData.coverImageUrl} onChange={handleChange} required />
                        </div>

                        {/* Logistics */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="date" className="text-lg font-semibold">Date</Label>
                                <Input id="date" type="date" value={tripData.date} onChange={handleChange} required />
                            </div>
                             <div className="space-y-2">
                                <Label htmlFor="seats" className="text-lg font-semibold">Available Seats</Label>
                                <Input id="seats" type="number" min="1" value={tripData.seats} onChange={handleChange} required />
                            </div>
                             <div className="space-y-2">
                                <Label htmlFor="price" className="text-lg font-semibold">Price per Seat ($)</Label>
                                <Input id="price" type="number" min="0" value={tripData.price} onChange={handleChange} required />
                            </div>
                        </div>

                        {/* Stops */}
                         <div className="space-y-4">
                            <Label className="text-lg font-semibold">Trip Itinerary (Stops)</Label>
                            <div className="flex gap-2">
                                <Input 
                                    placeholder="Add a new stop, e.g., 'Jeita Grotto'" 
                                    value={newStop} 
                                    onChange={(e) => setNewStop(e.target.value)}
                                    onKeyDown={(e) => { if(e.key === 'Enter') { e.preventDefault(); handleAddStop(); }}}
                                />
                                <Button type="button" onClick={handleAddStop}><PlusCircle className="h-4 w-4 mr-2" /> Add Stop</Button>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {tripData.stops.length === 0 && <p className="text-sm text-muted-foreground">No stops added yet.</p>}
                                {tripData.stops.map((stop, index) => (
                                    <Badge key={index} variant="secondary" className="text-base py-1 pl-3 pr-1">
                                        {stop}
                                        <button type="button" onClick={() => handleRemoveStop(stop)} className="ml-2 rounded-full hover:bg-destructive/20 p-0.5">
                                            <X className="h-3 w-3"/>
                                        </button>
                                    </Badge>
                                ))}
                            </div>
                        </div>

                    </CardContent>
                    <CardFooter>
                        <Button type="submit" size="lg" className="w-full">Publish Trip</Button>
                    </CardFooter>
                </form>
            </Card>
        </div>
    );
}

export default OfferTouristicTripsPage;
