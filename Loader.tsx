
import React from 'react';

const Loader: React.FC = () => {
  return (
    <div className="flex flex-col justify-center items-center py-10">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-green-600"></div>
      <p className="mt-4 text-lg text-gray-600 font-semibold">Recherche des meilleurs trajets...</p>
    </div>
  );
};

export default Loader;
