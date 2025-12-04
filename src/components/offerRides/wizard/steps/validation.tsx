import { WizardData } from "./types";

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

export const validateStep1 = (data: WizardData): ValidationResult => {
  const { departureCity, arrivalCity, departureDate, departureTime } = data.routeDetails;
  const errors: string[] = [];

  if (!departureCity) errors.push("Departure city is required");
  if (!arrivalCity) errors.push("Arrival city is required");
  if (!departureDate) errors.push("Departure date is required");
  if (!departureTime) errors.push("Departure time is required");
  // Route selection temporarily disabled - using route_id = 1 for testing
  // if (!selectedRoute) errors.push("Please select a route from the map");

  return {
    isValid: errors.length === 0,
    errors,
  };
};

export const validateStep2 = (data: WizardData): ValidationResult => {
  const { selectedVehicleId, availableSeats, pricePerSeat, priceType } = data.vehicleAndPricing;
  const errors: string[] = [];

  if (selectedVehicleId === null) errors.push("Please select a vehicle");
  if (availableSeats <= 0) errors.push("Available seats must be greater than 0");
  if (pricePerSeat <= 0) errors.push("Price per seat must be greater than 0");
  if (!priceType) errors.push("Please select a price type");

  return {
    isValid: errors.length === 0,
    errors,
  };
};

export const validateStep3 = (_data: WizardData): ValidationResult => {
  // No strictly required fields in preferences, but function is here for consistency
  return {
    isValid: true,
    errors: [],
  };
};

export const validateStep4 = (data: WizardData): ValidationResult => {
  const { agreeTerms } = data.publishing;
  const errors: string[] = [];

  if (!agreeTerms) errors.push("You must agree to the terms and conditions");

  return {
    isValid: errors.length === 0,
    errors,
  };
};

export const validateAll: Record<number, (data: WizardData) => ValidationResult> = {
  1: validateStep1,
  2: validateStep2,
  3: validateStep3,
  4: validateStep4,
};