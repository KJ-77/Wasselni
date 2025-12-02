import { WizardData } from "./types";

export const validateStep1 = (data: WizardData) => {
  const { departureCity, arrivalCity, departureDate, departureTime } = data.routeDetails;
  return !!departureCity && !!arrivalCity && !!departureDate && !!departureTime;
};

export const validateStep2 = (data: WizardData) => {
  const { selectedVehicleId, availableSeats, pricePerSeat } = data.vehicleAndPricing;
  return selectedVehicleId !== null && availableSeats > 0 && pricePerSeat > 0;
};

export const validateStep3 = (_data: WizardData) => {
  // No strictly required fields in preferences, but function is here for consistency
  return true;
};

export const validateStep4 = (data: WizardData) => {
    const { agreeTerms } = data.publishing;
    return agreeTerms;
}

export const validateAll: Record<number, (data: WizardData) => boolean> = {
  1: validateStep1,
  2: validateStep2,
  3: validateStep3,
  4: validateStep4,
};