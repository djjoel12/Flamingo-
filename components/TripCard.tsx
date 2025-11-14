import React from 'react';
import type { Trip } from '../types';
import { BusIcon } from './icons/BusIcon';
import { ClockIcon } from './icons/ClockIcon';
import { WifiIcon } from '../WifiIcon';
import { PowerIcon } from './icons/PowerIcon';
import { SnowIcon } from './icons/SnowIcon';

interface TripCardProps {
  trip: Trip;
  onBookNow: (trip: Trip) => void;
}

// Fix: Wrap icons in a span with a title to fix TS error and provide tooltip.
const AmenityIcon: React.FC<{ amenity: string }> = ({ amenity }) => {
    switch (amenity.toLowerCase()) {
        case 'wifi':
            return <span title="WiFi"><WifiIcon className="w-4 h-4 text-gray-500" /></span>;
        case 'climatisation':
            return <span title="Climatisation"><SnowIcon className="w-4 h-4 text-gray-500" /></span>;
        case 'prise usb':
            return <span title="Prise USB"><PowerIcon className="w-4 h-4 text-gray-500" /></span>;
        default:
            return null;
    }
};


const TripCard: React.FC<TripCardProps> = ({ trip, onBookNow }) => {
  const getDuration = (start: string, end: string): string => {
      const [startH, startM] = start.split(':').map(Number);
      const [endH, endM] = end.split(':').map(Number);
      let diffH = endH - startH;
      let diffM = endM - startM;
      if (diffM < 0) {
          diffH--;
          diffM += 60;
      }
      if (diffH < 0) {
          diffH += 24;
      }
      return `${diffH}h ${diffM.toString().padStart(2, '0')}min`;
  }

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 hover:shadow-lg hover:border-green-300 transition-all duration-300">
      <div className="md:flex">
        <div className="md:flex-shrink-0 p-6 flex flex-col items-center justify-center bg-green-50 md:w-48">
          <BusIcon className="h-10 w-10 text-green-600" />
          <h3 className="mt-2 text-lg font-bold text-green-800 text-center">{trip.companyName}</h3>
          <p className="text-sm text-gray-600">{trip.vehicleType}</p>
        </div>
        <div className="p-6 flex-grow">
          <div className="flex justify-between items-start">
            <div className="flex items-center space-x-4">
              <div>
                <p className="text-2xl font-bold text-gray-800">{trip.departureTime}</p>
                <p className="text-sm text-gray-500">Départ</p>
              </div>
              <div className="text-center">
                  <ClockIcon className="h-5 w-5 text-gray-400 mx-auto"/>
                  <p className="text-xs text-gray-500 mt-1">{getDuration(trip.departureTime, trip.arrivalTime)}</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-800">{trip.arrivalTime}</p>
                <p className="text-sm text-gray-500">Arrivée</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-green-600">
                {trip.price.toLocaleString('fr-CI')} <span className="text-sm font-normal">XOF</span>
              </p>
              <p className="text-xs text-gray-500">par passager</p>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-gray-200 flex justify-between items-center">
            <div>
                <p className="text-sm text-gray-600">{trip.stops} arrêt(s)</p>
                <div className="flex items-center space-x-3 mt-1">
                    {trip.amenities.map(amenity => <AmenityIcon key={amenity} amenity={amenity}/>)}
                </div>
            </div>
            <button
              onClick={() => onBookNow(trip)}
              className="bg-orange-500 text-white font-semibold py-2 px-5 rounded-lg hover:bg-orange-600 transition duration-300 transform hover:scale-105"
            >
              Réserver
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TripCard;