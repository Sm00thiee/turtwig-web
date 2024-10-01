import React, { useState } from 'react';
import { Clock, MapPin, ThumbsUp, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface PropertyDetailsProps {
  images?: string[];
  price: string;
  address: string;
  postedTime: string;
  onLike: () => void;
  onDislike: () => void;
  isAnimating: boolean;
}

const PropertyDetails: React.FC<PropertyDetailsProps> = ({ 
  images = [], 
  price, 
  address, 
  postedTime, 
  onLike, 
  onDislike,
  isAnimating
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  return (
    <div className={`bg-white rounded-lg shadow-lg overflow-hidden transition-opacity duration-300 ${isAnimating ? 'opacity-0' : 'opacity-100'}`}>
      <div className="relative">
        {images.length > 0 ? (
          <img src={images[currentImageIndex]} alt="Property" className="w-full h-64 object-cover" />
        ) : (
          <div className="w-full h-64 bg-gray-200 flex items-center justify-center">No image available</div>
        )}
        {images.length > 1 && (
          <>
            <Button variant="outline" className="absolute top-1/2 left-2 transform -translate-y-1/2" onClick={prevImage}>
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <Button variant="outline" className="absolute top-1/2 right-2 transform -translate-y-1/2" onClick={nextImage}>
              <ChevronRight className="w-4 h-4" />
            </Button>
          </>
        )}
        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2">
          {images.map((_, index) => (
            <span
              key={index}
              className={`inline-block w-2 h-2 rounded-full mx-1 ${
                index === currentImageIndex ? 'bg-white' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>
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