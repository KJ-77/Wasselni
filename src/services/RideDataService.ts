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
  vehicleUsed: string; // Foreign key to vehicles table (ID as string)
  departure_time: string; // ISO datetime
  arrival_time: string; // ISO datetime
  total_seats: number;
  available_seats: number;
  price_type: "fixed" | "per_distance";
  max_price: number;
  driver_price: number;
  is_recurring: boolean;
  recurring_days: string[]; // JSON array format (never undefined, use empty array)
  ride_status: "active" | "cancelled" | "completed";
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

  // TEMPORARY: Allow submission without route selection for testing
  // Route selection will be re-enabled when map functionality is complete
  // if (!routeDetails.selectedRoute) {
  //   throw new Error("No route selected");
  // }

  // if (!routeDetails.departureCoordinates || !routeDetails.arrivalCoordinates) {
  //   throw new Error("Missing departure or arrival coordinates");
  // }

  // Combine departure date and time into ISO datetime
  const departureDatetime = new Date(`${routeDetails.departureDate}T${routeDetails.departureTime}`);
  const departureTimeISO = departureDatetime.toISOString();

  // Calculate arrival time (use default 1 hour if no route duration)
  const defaultDuration = 3600; // 1 hour in seconds
  const arrivalTimeISO = calculateArrivalTime(
    departureTimeISO,
    routeDetails.selectedRoute?.duration || defaultDuration
  );

  // Create route object (with default values for testing when route not selected)
  const route: BackendRoute = {
    start_location: routeDetails.departureCity,
    end_location: routeDetails.arrivalCity,
    departureLat: routeDetails.departureCoordinates?.lat || 0,
    departureLng: routeDetails.departureCoordinates?.lng || 0,
    arrivalLat: routeDetails.arrivalCoordinates?.lat || 0,
    arrivalLng: routeDetails.arrivalCoordinates?.lng || 0,
    polyline: routeDetails.selectedRoute?.polyline || "",
    distance: routeDetails.selectedRoute?.distance || 0,
    duration: routeDetails.selectedRoute?.duration || defaultDuration,
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
  const priceType: "fixed" | "per_distance" = vehicleAndPricing.priceType || "fixed";

  const ride: BackendRide = {
    driver_id: driverId,
    route_id: 0, // Will be set after route creation
    vehicleUsed: "8", // TEMPORARY: Hardcoded vehicle ID for testing - TODO: use actual vehicle ID from database
    departure_time: departureTimeISO,
    arrival_time: arrivalTimeISO,
    total_seats: selectedVehicle.capacity,
    available_seats: vehicleAndPricing.availableSeats,
    price_type: priceType,
    max_price: vehicleAndPricing.pricePerSeat,
    driver_price: vehicleAndPricing.pricePerSeat,
    is_recurring: publishing.recurringRide || false,
    recurring_days: (publishing.recurrenceDays && publishing.recurrenceDays.length > 0)
      ? publishing.recurrenceDays
      : [], // Use empty array instead of undefined - backend doesn't accept undefined
    ride_status: "active" as const,
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
