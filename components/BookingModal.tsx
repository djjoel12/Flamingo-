
import React from 'react';
import type { Trip } from '../types';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  trip: Trip;
}

const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose, onConfirm, trip }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md transform transition-all"
           onClick={(e) => e.stopPropagation()}>
        <div className="p-6">
          <div className="flex justify-between items-start">
            <h2 className="text-2xl font-bold text-gray-800">Confirmer la réservation</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <div className="mt-4 space-y-3 text-gray-600">
            <p>Vous êtes sur le point de réserver un billet pour le trajet suivant :</p>
            <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
              <p><span className="font-semibold">Compagnie:</span> {trip.companyName}</p>
              <p><span className="font-semibold">Départ:</span> {trip.departureTime}</p>
              <p><span className="font-semibold">Arrivée:</span> {trip.arrivalTime}</p>
              <p className="mt-2 text-lg font-bold text-green-600">
                Total: {trip.price.toLocaleString('fr-CI')} XOF
              </p>
            </div>
            <p>Un email de confirmation sera envoyé après le paiement.</p>
          </div>
        </div>
        
        <div className="bg-gray-50 px-6 py-4 flex justify-end space-x-3 rounded-b-lg">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
          >
            Annuler
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors"
          >
            Confirmer et Payer
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingModal;
