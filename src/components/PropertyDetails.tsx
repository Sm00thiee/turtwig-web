import React from 'react';
import { Clock, MapPin, Home, Users, Bath } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PropertyInfo } from '../types/property';

interface PropertyDetailsProps {
  property: PropertyInfo;
  isAnimating: boolean;
}

const PropertyDetails: React.FC<PropertyDetailsProps> = ({ 
  property,
  isAnimating
}) => {
  return (
    <div className={`bg-white rounded-lg shadow-lg overflow-hidden transition-opacity duration-300 ${isAnimating ? 'opacity-0' : 'opacity-100'}`}>
      <div className="relative h-96">
        <img 
          src={property.mediaUrls[0]} 
          alt="Property" 
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-4 left-4 bg-white px-4 py-2 rounded-full text-2xl font-bold">
          {property.price}
        </div>
      </div>
      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center text-gray-600">
            <MapPin className="w-4 h-4 mr-2" />
            <span>{property.address}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <Clock className="w-4 h-4 mr-2" />
            <span>{new Date(property.publishDateTime).toLocaleString()}</span>
          </div>
        </div>
        <div className="flex justify-between items-center text-sm text-gray-600 mb-4">
          <div className="flex items-center">
            <Home className="w-4 h-4 mr-1" />
            <span>{property.size}</span>
          </div>
          <div className="flex items-center">
            <Users className="w-4 h-4 mr-1" />
            <span>{property.bedrooms} bedrooms</span>
          </div>
          <div className="flex items-center">
            <Bath className="w-4 h-4 mr-1" />
            <span>{property.bathrooms} bathrooms</span>
          </div>
        </div>
        <p className="text-gray-700 mb-4">{property.description}</p>
        <Button variant="outline" className="w-full">
          See details
        </Button>
      </div>
    </div>
  );
};

export default PropertyDetails;