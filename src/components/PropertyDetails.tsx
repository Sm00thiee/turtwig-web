import React, { useState } from 'react';
import { Clock, MapPin, ChevronLeft, ChevronRight, Home, Bath, BedDouble } from 'lucide-react';
import { Button } from '@/components/ui/button';
import FullSizeImageModal from './FullSizeImageModal';
import GoogleMap from './GoogleMap';

interface PropertyDetailsProps {
  images: string[];
  price: string;
  address: string;
  postedTime: string;
  isAnimating: boolean;
  squareMeters: number;
  bedrooms: number;
  bathrooms: number;
}

const PropertyDetails: React.FC<PropertyDetailsProps> = ({ 
  images, 
  price, 
  address, 
  postedTime,
  isAnimating,
  squareMeters,
  bedrooms,
  bathrooms
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showDetails, setShowDetails] = useState(false);
  const [showFullSizeImage, setShowFullSizeImage] = useState(false);

  const allImages = [...images, 'map'];
  const totalImages = allImages.length;

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % totalImages);
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + totalImages) % totalImages);
  };

  const handleImageClick = () => {
    if (currentImageIndex < images.length) {
      setShowFullSizeImage(true);
    }
  };

  return (
    <div className={`bg-white rounded-lg shadow-lg overflow-hidden transition-opacity duration-300 ${isAnimating ? 'opacity-0' : 'opacity-100'}`}>
      <div className="relative h-64 md:h-96">
        {currentImageIndex < images.length ? (
          <img 
            src={allImages[currentImageIndex]} 
            alt="Property" 
            className="w-full h-full object-cover cursor-pointer" 
            onClick={handleImageClick}
          />
        ) : (
          <GoogleMap address={address} />
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
        <h2 className="text-2xl font-bold mb-2">{price}</h2>
        <div className="flex items-center text-gray-600 mb-2">
          <MapPin className="w-4 h-4 mr-2" />
          <span>{address}</span>
        </div>
        <div className="flex items-center text-gray-600 mb-4">
          <Clock className="w-4 h-4 mr-2" />
          <span>{postedTime}</span>
        </div>
        <div className="flex justify-between items-center text-sm text-gray-600 mb-4">
          <div className="flex items-center">
            <Home className="w-4 h-4 mr-1" />
            <span>{squareMeters} m²</span>
          </div>
          <div className="flex items-center">
            <BedDouble className="w-4 h-4 mr-1" />
            <span>{bedrooms}</span>
          </div>
          <div className="flex items-center">
            <Bath className="w-4 h-4 mr-1" />
            <span>{bathrooms}</span>
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
            <h3 className="font-semibold text-lg mb-2">Descriptions</h3>
            <h4 className="font-semibold mb-2">Modern Studio Apartment in the Heart of Hanoi</h4>
            <ul className="list-disc pl-5 mb-4">
              <li>Location: {address}</li>
              <li>Price: {price} per month</li>
              <li>Size: {squareMeters} sqm</li>
              <li>Type: Studio Apartment</li>
            </ul>
            <h4 className="font-semibold mb-2">Features and Amenities</h4>
            <ul className="list-disc pl-5 mb-4">
              <li>Fully furnished with modern decor and appliances.</li>
              <li>Open-concept living space with a comfortable bed, sofa, and dining area.</li>
              <li>Well-equipped kitchenette with refrigerator, stove, microwave, and utensils.</li>
              <li>Private bathroom with shower and hot water supply.</li>
              <li>Air conditioning and high-speed internet connection included.</li>
              <li>Access to shared laundry facilities within the building.</li>
            </ul>
            <h4 className="font-semibold mb-2">Building Facilities</h4>
            <p className="mb-2">The apartment is located within a well-maintained residential building that offers:</p>
            <ul className="list-disc pl-5 mb-4">
              <li>24/7 security surveillance for enhanced safety.</li>
              <li>Elevator access to all floors for convenience.</li>
              <li>Rooftop garden providing scenic views of the city.</li>
            </ul>
            <h4 className="font-semibold mb-2">Location</h4>
            <p className="mb-2">Situated in the heart of Hanoi's vibrant district:</p>
            <ul className="list-disc pl-5">
              <li>Walking distance to popular attractions like Hoan Kiem Lake and Old Quarter.</li>
              <li>Close proximity to cafes, restaurants, shopping centers, and entertainment venues.</li>
              <li>Excellent public transportation connectivity.</li>
            </ul>
          </div>
        )}
      </div>
      {showFullSizeImage && (
        <FullSizeImageModal
          imageUrl={images[currentImageIndex]}
          onClose={() => setShowFullSizeImage(false)}
        />
      )}
    </div>
  );
};

export default PropertyDetails;