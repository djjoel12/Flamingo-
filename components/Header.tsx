
import React from 'react';
import { BusIcon } from './icons/BusIcon';

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <BusIcon className="h-8 w-8 text-green-600" />
            <span className="text-2xl font-bold text-gray-800">
              Ivoire<span className="text-orange-500">Trajet</span>
            </span>
          </div>
          <nav>
            <button className="hidden md:inline-block bg-green-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-green-700 transition duration-300">
              Mon Compte
            </button>
            <button className="md:hidden bg-transparent text-gray-700 p-2 rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
