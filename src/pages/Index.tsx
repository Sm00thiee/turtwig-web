import React, { useState } from 'react';
import UserProfile from '@/components/UserProfile';
import PropertyListing from '@/components/PropertyListing';
import PropertyDetails from '@/components/PropertyDetails';
import MessagingScreen from '@/components/MessagingScreen';
import { toast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { ThumbsUp, X } from 'lucide-react';

const properties = [
  {
    id: 1,
    price: "9.0 million/month",
    address: "18 Ngoc Tu Gate, Van Mieu, Dong Da, Ha Noi",
    images: [
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
    ],
    postedTime: "8 hours ago",
    squareMeters: 60,
    bedrooms: 2,
    bathrooms: 2
  },
  {
    id: 2,
    price: "10.0 million/month",
    address: "48 Xuan Dieu, Tay Ho, Dong Da, Ha Noi",
    images: [
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
    ],
    postedTime: "12 hours ago",
    squareMeters: 75,
    bedrooms: 3,
    bathrooms: 2
  },
  {
    id: 3,
    price: "9.0 million/month",
    address: "22 Lieu Giai, Ba Dinh, Ha Noi",
    images: [
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
    ],
    postedTime: "1 day ago",
    squareMeters: 55,
    bedrooms: 2,
    bathrooms: 1
  }
];

const Index = () => {
  const [currentPropertyIndex, setCurrentPropertyIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [likedProperties, setLikedProperties] = useState([]);
  const [selectedProperty, setSelectedProperty] = useState(null);

  const handleLike = () => {
    const currentProperty = properties[currentPropertyIndex];
    if (!likedProperties.some(prop => prop.id === currentProperty.id)) {
      setLikedProperties([...likedProperties, currentProperty]);
    }
    toast({
      title: "Liked!",
      description: "You liked this property.",
    });
    moveToNextProperty();
  };

  const handleDislike = () => {
    toast({
      title: "Disliked!",
      description: "You disliked this property.",
    });
    moveToNextProperty();
  };

  const moveToNextProperty = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentPropertyIndex((prevIndex) => (prevIndex + 1) % properties.length);
      setIsAnimating(false);
    }, 300);
  };

  const handlePropertyClick = (property) => {
    setSelectedProperty(property);
  };

  const currentProperty = properties[currentPropertyIndex];

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col md:flex-row">
      <div className="w-full md:w-1/4 p-4 bg-white border-b md:border-r md:border-b-0">
        <UserProfile name="John Doe" status="Active renter" />
        <h2 className="mt-8 mb-4 text-xl font-semibold">Liked Units</h2>
        <div className="overflow-y-auto max-h-[calc(100vh-200px)]">
          {likedProperties.map((property) => (
            <PropertyListing
              key={property.id}
              price={property.price}
              address={property.address}
              isSelected={selectedProperty && selectedProperty.id === property.id}
              onClick={() => handlePropertyClick(property)}
            />
          ))}
        </div>
      </div>
      <div className="flex-1 p-4 md:p-8 flex flex-col">
        {selectedProperty ? (
          <MessagingScreen property={selectedProperty} onClose={() => setSelectedProperty(null)} />
        ) : (
          <>
            <PropertyDetails 
              images={currentProperty.images}
              price={currentProperty.price}
              address={currentProperty.address}
              postedTime={currentProperty.postedTime}
              isAnimating={isAnimating}
              squareMeters={currentProperty.squareMeters}
              bedrooms={currentProperty.bedrooms}
              bathrooms={currentProperty.bathrooms}
            />
            <div className="flex justify-between mt-4">
              <Button variant="destructive" className="w-1/3" onClick={handleDislike}>
                <X className="w-4 h-4 mr-2" />
                Dislike
              </Button>
              <Button variant="default" className="w-1/2 bg-green-500 hover:bg-green-600" onClick={handleLike}>
                <ThumbsUp className="w-4 h-4 mr-2" />
                Like
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Index;