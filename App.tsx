
import React, { useState, useCallback } from 'react';
import Header from './components/Header';
import SearchForm from './components/SearchForm';
import TripResults from './components/TripResults';
import BookingModal from './components/BookingModal';
import { findTrips } from './services/apiService';
import type { Trip, SearchParams } from './types';
import { CITIES } from './constants';

const App: React.FC = () => {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedTrip, setSelectedTrip] = useState<Trip | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [searched, setSearched] = useState<boolean>(false);

  const handleSearch = useCallback(async (searchParams: SearchParams) => {
    setIsLoading(true);
    setError(null);
    setSearched(true);
    setTrips([]);

    try {
      const results = await findTrips(searchParams.from, searchParams.to, searchParams.date);
      setTrips(results);
    } catch (err) {
      setError('Une erreur est survenue lors de la recherche. Veuillez réessayer.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleBookNow = (trip: Trip) => {
    setSelectedTrip(trip);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedTrip(null);
  };

  const handleConfirmBooking = () => {
    // In a real app, this would trigger the payment and booking process.
    console.log('Booking confirmed for:', selectedTrip);
    handleCloseModal();
  };

  return (
    <div className="bg-gray-50 min-h-screen text-gray-800">
      <Header />
      <main>
        <div className="relative bg-cover bg-center h-80 md:h-96" style={{backgroundImage: "url('https://picsum.photos/1600/900?grayscale&blur=2&random=1')"}}>
          <div className="absolute inset-0 bg-green-800 bg-opacity-60"></div>
          <div className="relative container mx-auto px-4 h-full flex flex-col justify-center items-center text-center text-white">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-lg">Voyagez en toute sérénité</h1>
            <p className="text-lg md:text-xl max-w-2xl drop-shadow-md">Réservez vos billets de transport en Côte d'Ivoire, simplement et rapidement.</p>
          </div>
        </div>
        
        <div className="relative px-4 -mt-24 z-10">
          <div className="container mx-auto">
            <SearchForm cities={CITIES} onSearch={handleSearch} isLoading={isLoading} />
          </div>
        </div>
        
        <div className="container mx-auto px-4 py-8 md:py-12">
          <TripResults 
            trips={trips} 
            isLoading={isLoading} 
            error={error} 
            onBookNow={handleBookNow}
            searched={searched}
          />
        </div>
      </main>

      {selectedTrip && (
        <BookingModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onConfirm={handleConfirmBooking}
          trip={selectedTrip}
        />
      )}

      <footer className="bg-gray-800 text-white py-6 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; {new Date().getFullYear()} IvoireTrajet. Tous droits réservés.</p>
          <p className="text-sm text-gray-400 mt-1">Propulsé par une infrastructure robuste</p>
        </div>
      </footer>
    </div>
  );
};

export default App;
