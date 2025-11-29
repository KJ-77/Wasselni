import { WizardData } from "./types";



export const validateStep1 = (data: WizardData) => {
  const { departureCity, departureDate, departureTime } = data.ride1.departure || {};
  const { arrivalCity } = data.ride1.arrival || {};
  return !!departureCity && !!departureDate && !!departureTime && !!arrivalCity;
};

export const validateStep2 = (data: WizardData) => {
  const { fullName, phone, email } = data.driver;
  return fullName !== "" && phone.length >= 8 && email !== "";
};

export const validateStep3 = (data: WizardData) => {
  const { brand, model, year, seats, pricePerSeat } = data.vehicle;
  const { method } = data.payment;
  return brand !== "" && model !== "" && year !== "" && seats !== "" && pricePerSeat !== "" && method !== "";
};

export const validateAll: Record<number, (data: WizardData) => boolean> = {
  1: validateStep1,
  2: validateStep2,
  3: validateStep3,
};