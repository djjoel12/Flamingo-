
export interface Trip {
  companyName: string;
  departureTime: string;
  arrivalTime: string;
  price: number;
  vehicleType: 'Bus' | 'Minibus' | 'VTC';
  stops: number;
  amenities: string[];
}

export interface SearchParams {
  from: string;
  to: string;
  date: string;
}
