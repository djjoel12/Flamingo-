
import React from 'react';
import TripCard from './TripCard';
import Loader from '../Loader';
import type { Trip } from '../types';

interface TripResultsProps {
  trips: Trip[];
  isLoading: boolean;
  error: string | null;
  onBookNow: (trip: Trip) => void;
  searched: boolean;
}

const TripResults: React.FC<TripResultsProps> = ({ trips, isLoading, error, onBookNow, searched }) => {
  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <div className="text-center py-10 px-4 bg-red-50 border border-red-200 rounded-lg">
        <h3 className="text-xl font-semibold text-red-700">Oops! Une erreur est survenue.</h3>
        <p className="text-red-600 mt-2">{error}</p>
    </div>;
  }
  
  if (!searched) {
      return (
        <div className="text-center py-10 px-4 bg-green-50 border border-green-200 rounded-lg">
            <h3 className="text-xl font-semibold text-green-800">Prêt à partir ?</h3>
            <p className="text-green-700 mt-2">Utilisez le formulaire ci-dessus pour trouver votre prochain voyage.</p>
        </div>
      );
  }

  if (trips.length === 0) {
    return <div className="text-center py-10 px-4 bg-yellow-50 border border-yellow-200 rounded-lg">
        <h3 className="text-xl font-semibold text-yellow-800">Aucun trajet trouvé</h3>
        <p className="text-yellow-700 mt-2">Nous n'avons trouvé aucun voyage correspondant à votre recherche. Essayez d'autres critères.</p>
    </div>;
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Résultats de la recherche</h2>
      <div className="space-y-4">
        {trips.map((trip, index) => (
          <TripCard key={index} trip={trip} onBookNow={onBookNow} />
        ))}
      </div>
    </div>
  );
};

export default TripResults;
