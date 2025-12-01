export interface Ride {
  id: number;
  driver: {
    name: string;
    avatar: string;
    rating: number;
    trips: number;
    isVerified: boolean;
    isPro: boolean;
    aubGrad: boolean;

  };
  price: {
    amount: number;
    currency: string;
    discount?: number;
  };
  route: {
    from: {
      name: string;
      location: string;
    };
    to: {
      name: string;
      location: string;
    };
    departureTime: string;
    arrivalTime: string;
  };
  tripDetails: {
    duration: string;
    distance: number;
    description: string;
  };
  vehicle: {
    model: string;
    seats: {
      booked: number;
      total: number;
    };
    amenities: string[];
  };
  bookingType: 'Instant' | 'Request';
}