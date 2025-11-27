export interface CarDetails {
  brand: string;
  model: string;
  year: string;
}

export interface DriverInfo {
  fullName: string;
  phone: string;
}

export interface PaymentInfo {
  method: string;
  cardNumber?: string;
}

export interface WizardData {
  car: CarDetails;
  driver: DriverInfo;
  payment: PaymentInfo;
}
