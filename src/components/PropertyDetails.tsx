import React, { useState } from 'react';
import { Clock, MapPin, ChevronLeft, ChevronRight, Home, Bath, BedDouble } from 'lucide-react';
import { Button } from '@/components/ui/button';
import FullSizeImageModal from './FullSizeImageModal';
import GoogleMap from './GoogleMap';
import { Property } from '../types/property';

interface PropertyDetailsProps {
  property: Property;
  isAnimating: boolean;
}

const PropertyDetails: React.FC<PropertyDetailsProps> = ({ 
  property,
  isAnimating
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showDetails, setShowDetails] = useState(false);
  const [showFullSizeImage, setShowFullSizeImage] = useState(false);

  const allImages = [...(property.MediaUrls || []), 'map'];
  const totalImages = allImages.length;

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % totalImages);
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + totalImages) % totalImages);
  };

  const handleImageClick = () => {
    if (currentImageIndex < (property.MediaUrls?.length || 0)) {
      setShowFullSizeImage(true);
    }
  };

  return (
    <div className={`bg-white rounded-lg shadow-lg overflow-hidden transition-opacity duration-300 ${isAnimating ? 'opacity-0' : 'opacity-100'}`}>
      <div className="relative h-64 md:h-96">
        {currentImageIndex < (property.MediaUrls?.length || 0) ? (
          <img 
            src={allImages[currentImageIndex]} 
            alt="Property" 
            className="w-full h-full object-cover cursor-pointer" 
            onClick={handleImageClick}
          />
        ) : (
          <GoogleMap address={property.Address || ''} />
        )}
        {totalImages > 1 && (
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
          {allImages.map((_, index) => (
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
        <h2 className="text-2xl font-bold mb-2">{property.Price}</h2>
        <div className="flex items-center text-gray-600 mb-2">
          <MapPin className="w-4 h-4 mr-2" />
          <span>{property.Address}</span>
        </div>
        <div className="flex items-center text-gray-600 mb-4">
          <Clock className="w-4 h-4 mr-2" />
          <span>{new Date(property.PublishDateTime).toLocaleString()}</span>
        </div>
        <div className="flex justify-between items-center text-sm text-gray-600 mb-4">
          <div className="flex items-center">
            <Home className="w-4 h-4 mr-1" />
            <span>{property.Name}</span>
          </div>
        </div>
        <Button 
          variant="outline" 
          className="w-full text-gray-600 hover:bg-gray-100"
          onClick={() => setShowDetails(!showDetails)}
        >
          {showDetails ? 'Hide details' : 'See details'}
        </Button>
        {showDetails && (
          <div className="mt-4 text-sm text-gray-600">
            <h3 className="font-semibold text-lg mb-2">Description</h3>
            <p>{property.Description}</p>
          </div>
        )}
      </div>
      {showFullSizeImage && property.MediaUrls && (
        <FullSizeImageModal
          imageUrl={property.MediaUrls[currentImageIndex]}
          onClose={() => setShowFullSizeImage(false)}
        />
      )}
    </div>
  );
};

export default PropertyDetails;