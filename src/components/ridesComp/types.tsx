// components/ridesComponents/types.ts
export type Ride = {
  id: string;
  driverInitials: string;
  driverName: string;
  rating: number;
  trips?: number;
  price: number;
  from: string;
  to: string;
  startTime: string; // ISO or display string
  endTime?: string;
  car: string;
  seats: string;
  duration?: string;
  badges?: string[]; // e.g. ['Verified','Pro']
  // optional route info used by map component:
  routeCoordinates?: Array<[number, number]>; // [lng, lat] pairs
};
