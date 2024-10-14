import React from 'react';
import { PropertyInfo } from '../types/property';
import { Home, Users, Bath } from 'lucide-react';

interface PropertyListProps {
  properties: PropertyInfo[];
  onPropertyClick: (property: PropertyInfo) => void;
}

const PropertyList: React.FC<PropertyListProps> = ({ properties, onPropertyClick }) => {
  return (
    <div className="space-y-2 p-4">
      {properties.map((property) => (
        <div
          key={property.id}
          className="flex items-center p-2 border rounded cursor-pointer hover:bg-gray-100"
          onClick={() => onPropertyClick(property)}
        >
          <img
            src={property.mediaUrls[0]}
            alt={property.name}
            className="w-20 h-20 object-cover rounded mr-4"
          />
          <div>
            <h3 className="font-bold text-green-500">{property.price}</h3>
            <p className="text-sm text-gray-600">{property.address}</p>
            <div className="flex space-x-4 mt-1 text-xs text-gray-500">
              <span className="flex items-center">
                <Home className="w-3 h-3 mr-1" />
                {property.size}
              </span>
              <span className="flex items-center">
                <Users className="w-3 h-3 mr-1" />
                {property.bedrooms}
              </span>
              <span className="flex items-center">
                <Bath className="w-3 h-3 mr-1" />
                {property.bathrooms}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PropertyList;