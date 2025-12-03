// Represents a single stop in the route
export interface Stop {
  id: number;
  location: string;
  coordinates?: { lat: number; lng: number };
}

// Step 1: Route Details
export interface RouteDetails {
  departureCity: string;
  departureAddress: string;
  departureCoordinates?: { lat: number; lng: number };
  arrivalCity: string;
  arrivalAddress: string;
  arrivalCoordinates?: { lat: number; lng: number };
  departureDate: string;
  departureTime: string;
  isRoundTrip: boolean;
  returnDate: string;
  returnTime: string;
  stops: Stop[];
}

// Represents a user's registered vehicle
export interface Vehicle {
  id: number | string;
  make: string;
  model: string;
  year: number;
  color: string;
  plate: string;
  type: "sedan" | "suv" | "van" | "hatchback" | string;
  capacity: number;
  photo: string; // URL or base64 string
  verified: boolean;
}

// Step 2: Vehicle & Pricing
export interface VehicleAndPricing {
  selectedVehicleId: number | string | null;
  availableSeats: number;
  pricePerSeat: number;
}

// Step 3: Ride Preferences
export interface RidePreferences {
  amenities: string[]; // e.g., ['ac', 'music']
  instantBooking: boolean;
  womenOnly: boolean;
  verifiedOnly: boolean;
  minRating: number; // 0, 4.0, 4.5, 4.8
  additionalNotes: string;
}

// Step 4: Review & Publish
export interface PublishingOptions {
  featuredRide: boolean;
  recurringRide: boolean;
  agreeTerms: boolean;
  // Recurrence options for recurring rides
  recurrenceFrequency?: 'daily' | 'weekly' | 'monthly';
  recurrenceDays?: string[]; // indexes or weekday identifiers
  recurrenceEnd?: string; // ISO date string
}

// The complete data structure for the wizard
export interface WizardData {
  routeDetails: RouteDetails;
  vehicleAndPricing: VehicleAndPricing;
  preferences: RidePreferences;
  publishing: PublishingOptions;
}
