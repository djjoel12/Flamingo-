
import React, { useState } from 'react';
import type { SearchParams } from '../types';
import { LocationIcon } from './icons/LocationIcon';
import { CalendarIcon } from './icons/CalendarIcon';
import { ArrowRightIcon } from './icons/ArrowRightIcon';

interface SearchFormProps {
  cities: string[];
  onSearch: (params: SearchParams) => void;
  isLoading: boolean;
}

const SearchForm: React.FC<SearchFormProps> = ({ cities, onSearch, isLoading }) => {
  const [from, setFrom] = useState<string>(cities[0] || '');
  const [to, setTo] = useState<string>(cities[1] || '');
  const [date, setDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (from === to) {
      setError("La ville de départ et d'arrivée doivent être différentes.");
      return;
    }
    setError(null);
    onSearch({ from, to, date });
  };
  
  const swapLocations = () => {
    const temp = from;
    setFrom(to);
    setTo(temp);
  };

  return (
    <div className="bg-white p-6 md:p-8 rounded-xl shadow-lg border border-gray-100">
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-10 gap-4 items-end">
          
          {/* From */}
          <div className="md:col-span-3">
            <label htmlFor="from" className="block text-sm font-medium text-gray-700 mb-1">Départ</label>
            <div className="relative">
              <LocationIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <select
                id="from"
                value={from}
                onChange={(e) => setFrom(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500 transition"
              >
                {cities.map(city => <option key={city} value={city}>{city}</option>)}
              </select>
            </div>
          </div>

          {/* Swap Button */}
          <div className="flex justify-center items-end md:col-span-1">
            <button
              type="button"
              onClick={swapLocations}
              className="p-3 bg-gray-100 rounded-full text-gray-600 hover:bg-green-100 hover:text-green-600 transition duration-300"
              aria-label="Inverser les villes"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
              </svg>
            </button>
          </div>
          
          {/* To */}
          <div className="md:col-span-3">
            <label htmlFor="to" className="block text-sm font-medium text-gray-700 mb-1">Arrivée</label>
            <div className="relative">
              <LocationIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <select
                id="to"
                value={to}
                onChange={(e) => setTo(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500 transition"
              >
                {cities.map(city => <option key={city} value={city}>{city}</option>)}
              </select>
            </div>
          </div>
          
          {/* Date */}
          <div className="md:col-span-2">
            <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">Date</label>
            <div className="relative">
              <CalendarIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="date"
                id="date"
                value={date}
                min={new Date().toISOString().split('T')[0]}
                onChange={(e) => setDate(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500 transition"
              />
            </div>
          </div>
          
          {/* Submit */}
          <div className="md:col-span-1">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-orange-500 text-white font-bold py-3 px-4 rounded-lg hover:bg-orange-600 transition duration-300 flex items-center justify-center disabled:bg-orange-300 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : (
                <ArrowRightIcon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
      </form>
    </div>
  );
};

export default SearchForm;
