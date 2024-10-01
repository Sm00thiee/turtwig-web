import React from 'react';
import { Clock, MapPin, ThumbsUp, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface PropertyDetailsProps {
  imageUrl: string;
  price: string;
  address: string;
  postedTime: string;
  onLike: () => void;
  onDislike: () => void;
}

const PropertyDetails: React.FC<PropertyDetailsProps> = ({ imageUrl, price, address, postedTime, onLike, onDislike }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <img src={imageUrl} alt="Property" className="w-full h-64 object-cover" />
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-2">{price}</h2>
        <div className="flex items-center text-gray-600 mb-4">
          <MapPin className="w-4 h-4 mr-2" />
          <span>{address}</span>
        </div>
        <div className="flex items-center text-gray-600 mb-6">
          <Clock className="w-4 h-4 mr-2" />
          <span>{postedTime}</span>
        </div>
        <div className="flex justify-between">
          <Button variant="outline" className="flex-1 mr-2" onClick={onLike}>
            <ThumbsUp className="w-4 h-4 mr-2" />
            Like (Swipe Left)
          </Button>
          <Button variant="outline" className="flex-1 ml-2" onClick={onDislike}>
            <X className="w-4 h-4 mr-2" />
            Dislike (Swipe Right)
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;