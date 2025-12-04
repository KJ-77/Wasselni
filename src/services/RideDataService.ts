/**
 * RideDataService.ts
 * 
 * Transforms frontend WizardData into backend API request format
 * 
 * Backend Schema:
 * - Route: { start_location, end_location, departureLat, departureLng, arrivalLat, arrivalLng, polyline, distance, duration }
 * - Stop: { route_id, stopLat, stopLng, stopAddress, stopOrder, stopDuration }
 * - Ride: { driver_id, route_id, departure_time, arrival_time, total_seats, available_seats, price_type, max_price, driver_price, is_recurring, recurring_days, vehicleUsed, ride_status, preferences }
 */

import { WizardData, Vehicle } from "@/components/offerRides/wizard/steps/types";

export interface BackendRoute {
  start_location: string;
  end_location: string;
  departureLat: number;
  departureLng: number;
  arrivalLat: number;
  arrivalLng: number;
  polyline: string;
  distance: number;
  duration: number;
}

export interface BackendStop {
  routeId: number; // Will be set after route creation
  stopLat: number;
  stopLng: number;
  stopAddress: string;
  stopOrder: number;
  stopDuration?: number;
}

export interface BackendRide {
  driver_id: string | number;
  route_id: number;
  departure_time: string; // ISO datetime
  arrival_time: string; // ISO datetime
  total_seats: number;
  available_seats: number;
  price_type: "per_seat" | "fixed";
  max_price: number;
  driver_price: number;
  is_recurring: boolean;
  recurring_days?: string; // JSON string or comma-separated
  vehicleUsed: {
    id: number | string;
    make: string;
    model: string;
    year: number;
    color: string;
    plate: string;
    type: string;
    capacity: number;
    verified: boolean;
  };
  ride_status: "published" | "draft" | "archived";
  preferences: {
    amenities: string[];
    instantBooking: boolean;
    womenOnly: boolean;
    verifiedOnly: boolean;
    minRating: number;
    additionalNotes: string;
  };
}

export interface RidePayload {
  route: BackendRoute;
  stops: BackendStop[];
  ride: BackendRide;
}

/**
 * Calculate estimated arrival time based on departure time and duration
 */
function calculateArrivalTime(departureTime: string, durationSeconds: number): string {
  const departure = new Date(departureTime);
  const arrival = new Date(departure.getTime() + durationSeconds * 1000);
  return arrival.toISOString();
}

/**
 * Transform WizardData to backend payload
 */
export function transformWizardDataToRidePayload(
  data: WizardData,
  driverId: string | number,
  selectedVehicle: Vehicle
): RidePayload {
  const { routeDetails, vehicleAndPricing, preferences, publishing } = data;

  if (!routeDetails.selectedRoute) {
    throw new Error("No route selected");
  }

  if (!routeDetails.departureCoordinates || !routeDetails.arrivalCoordinates) {
    throw new Error("Missing departure or arrival coordinates");
  }

  // Combine departure date and time into ISO datetime
  const departureDatetime = new Date(`${routeDetails.departureDate}T${routeDetails.departureTime}`);
  const departureTimeISO = departureDatetime.toISOString();

  // Calculate arrival time
  const arrivalTimeISO = calculateArrivalTime(
    departureTimeISO,
    routeDetails.selectedRoute.duration || 0
  );

  // Create route object
  const route: BackendRoute = {
    start_location: routeDetails.departureCity,
    end_location: routeDetails.arrivalCity,
    departureLat: routeDetails.departureCoordinates.lat,
    departureLng: routeDetails.departureCoordinates.lng,
    arrivalLat: routeDetails.arrivalCoordinates.lat,
    arrivalLng: routeDetails.arrivalCoordinates.lng,
    polyline: routeDetails.selectedRoute.polyline || "",
    distance: routeDetails.selectedRoute.distance || 0,
    duration: routeDetails.selectedRoute.duration || 0,
  };

  // Create stops array
  const stops: BackendStop[] = (routeDetails.stops || []).map((stop, index) => ({
    routeId: 0, // Will be set after route creation
    stopLat: stop.coordinates?.lat || 0,
    stopLng: stop.coordinates?.lng || 0,
    stopAddress: stop.location || "",
    stopOrder: index + 1,
    stopDuration: 300, // Default 5 minutes
  }));

  // Determine price type and create ride object
  const priceType: "per_seat" | "fixed" = "per_seat";

  const ride: BackendRide = {
    driver_id: driverId,
    route_id: 0, // Will be set after route creation
    departure_time: departureTimeISO,
    arrival_time: arrivalTimeISO,
    total_seats: selectedVehicle.capacity,
    available_seats: vehicleAndPricing.availableSeats,
    price_type: priceType,
    max_price: vehicleAndPricing.pricePerSeat,
    driver_price: vehicleAndPricing.pricePerSeat,
    is_recurring: publishing.recurringRide || false,
    recurring_days: publishing.recurrenceDays?.join(",") || undefined,
    vehicleUsed: {
      id: selectedVehicle.id,
      make: selectedVehicle.make,
      model: selectedVehicle.model,
      year: selectedVehicle.year,
      color: selectedVehicle.color,
      plate: selectedVehicle.plate,
      type: selectedVehicle.type,
      capacity: selectedVehicle.capacity,
      verified: selectedVehicle.verified,
    },
    ride_status: "published" as const,
    preferences: {
      amenities: preferences.amenities || [],
      instantBooking: preferences.instantBooking || false,
      womenOnly: preferences.womenOnly || false,
      verifiedOnly: preferences.verifiedOnly || false,
      minRating: preferences.minRating || 0,
      additionalNotes: preferences.additionalNotes || "",
    },
  };

  return {
    route,
    stops,
    ride,
  };
}

/**
 * Alternative: Transform to flat object matching exact backend API schema
 * Use this if your backend expects a single POST body
 */
export function transformToFlatPayload(
  data: WizardData,
  driverId: string | number,
  selectedVehicle: Vehicle
): Record<string, any> {
  const payload = transformWizardDataToRidePayload(data, driverId, selectedVehicle);

  return {
    // Route fields
    start_location: payload.route.start_location,
    end_location: payload.route.end_location,
    departureLat: payload.route.departureLat,
    departureLng: payload.route.departureLng,
    arrivalLat: payload.route.arrivalLat,
    arrivalLng: payload.route.arrivalLng,
    polyline: payload.route.polyline,
    distance: payload.route.distance,
    duration: payload.route.duration,

    // Ride fields
    driver_id: payload.ride.driver_id,
    departure_time: payload.ride.departure_time,
    arrival_time: payload.ride.arrival_time,
    total_seats: payload.ride.total_seats,
    available_seats: payload.ride.available_seats,
    price_type: payload.ride.price_type,
    max_price: payload.ride.max_price,
    driver_price: payload.ride.driver_price,
    is_recurring: payload.ride.is_recurring,
    recurring_days: payload.ride.recurring_days,
    vehicleUsed: payload.ride.vehicleUsed,
    ride_status: payload.ride.ride_status,
    preferences: payload.ride.preferences,

    // Stops array
    stops: payload.stops,
  };
}
