import React from 'react';
import { Home, DollarSign } from 'lucide-react';
import { Property } from '../types/property';

interface PropertyListingProps {
  property: Property;
  isSelected?: boolean;
  onClick?: () => void;
}

const PropertyListing: React.FC<PropertyListingProps> = ({ property, isSelected = false, onClick }) => {
  return (
    <div 
      className={`flex items-center p-4 mb-2 rounded-lg ${isSelected ? 'bg-green-100' : 'bg-white'} shadow cursor-pointer`}
      onClick={onClick}
    >
      <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
        <Home className="w-6 h-6 text-gray-500" />
      </div>
      <div className="ml-4 flex-grow">
        <h3 className="text-lg font-semibold">{property.Price}</h3>
        <p className="text-sm text-gray-500">{property.Address}</p>
      </div>
      {isSelected && <DollarSign className="w-6 h-6 text-green-500" />}
    </div>
  );
};

export default PropertyListing;