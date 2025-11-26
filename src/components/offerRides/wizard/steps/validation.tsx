import { WizardData } from "./types";



export const validateStep1 = (data: WizardData) => {
  const { brand, model, year } = data.car;
  return brand !== "" && model !== "" && year !== "";
};

export const validateStep2 = (data: WizardData) => {
  const { fullName, phone } = data.driver;
  return fullName !== "" && phone.length >= 8;
};

export const validateStep3 = (data: WizardData) => {
  const { method, cardNumber } = data.payment;
  if (method === "cash") return true;
  return !!cardNumber && cardNumber.length >= 8;
};

export const validateAll: Record<number, (data: WizardData) => boolean> = {
  1: validateStep1,
  2: validateStep2,
    3: validateStep3,
};