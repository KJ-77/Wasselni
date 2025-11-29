export interface Destination {
  departure?: {
    departureCity?: string;
    departureDate?: string;
    departureTime?: string;
    specificDepartureLocation?: string;
  }
  arrival?: {
      arrivalCity?: string;
      specificArrivalLocation?: string;
  };
  roundTrip: boolean;
  roundTripDates?: {
    departureDate?: string;
    returnDate?: string;
  };
}

export interface DriverInfo {
  fullName: string;
  phone: string;
  email: string;
}

export interface VehicleInfo {
  brand: string;
  model: string;
  year: string;
  seats: string;
  pricePerSeat: string;
  description?: string;
}

export interface PaymentInfo {
  method: string;
  cardNumber?: string;
}

export interface WizardData {
  ride1: Destination;
  driver: DriverInfo;
  vehicle: VehicleInfo;
  payment: PaymentInfo;
}
