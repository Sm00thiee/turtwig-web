import React, { useState } from 'react';
import UserProfile from '@/components/UserProfile';
import PropertyListing from '@/components/PropertyListing';
import PropertyDetails from '@/components/PropertyDetails';
import MessagingScreen from '@/components/MessagingScreen';
import PropertyActions from '@/components/PropertyActions';
import { toast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Property } from '../types/property';

const properties: Property[] = [
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
  const [likedProperties, setLikedProperties] = useState<Property[]>([]);
  const [bookmarkedProperties, setBookmarkedProperties] = useState<Property[]>([]);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [showUserPanel, setShowUserPanel] = useState(false);

  const currentProperty = properties[currentPropertyIndex];

  const handleLike = () => {
    if (!likedProperties.some(prop => prop.id === currentProperty.id)) {
      setLikedProperties([...likedProperties, currentProperty]);
    }
    showToast("Liked!", "You liked this property.");
    moveToNextProperty();
  };

  const handleDislike = () => {
    showToast("Disliked!", "You disliked this property.");
    moveToNextProperty();
  };

  const handleBookmark = () => {
    const isBookmarked = bookmarkedProperties.some(prop => prop.id === currentProperty.id);
    if (isBookmarked) {
      setBookmarkedProperties(bookmarkedProperties.filter(prop => prop.id !== currentProperty.id));
      showToast("Removed from Bookmarks", "This property has been removed from your bookmarks.");
    } else {
      setBookmarkedProperties([...bookmarkedProperties, currentProperty]);
      showToast("Bookmarked!", "You bookmarked this property.");
    }
  };

  const moveToNextProperty = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentPropertyIndex((prevIndex) => (prevIndex + 1) % properties.length);
      setIsAnimating(false);
    }, 300);
  };

  const handlePropertyClick = (property: Property) => {
    setSelectedProperty(property);
    setShowUserPanel(false);
  };

  const showToast = (title: string, description: string) => {
    toast({
      title,
      description,
      duration: 3000,
      className: "top-right-toast",
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <div className="flex-1 flex flex-col md:flex-row">
        {/* User Panel */}
        <div className={`bg-white md:w-1/4 md:min-h-screen transition-all duration-300 ease-in-out ${showUserPanel ? 'h-screen md:h-auto' : 'h-0 md:h-auto'} overflow-hidden`}>
          <div className="p-4">
            <UserProfile name="John Doe" status="Active renter" />
            <Tabs defaultValue="liked" className="mt-8">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="liked">Liked Units</TabsTrigger>
                <TabsTrigger value="bookmarked">Bookmarked</TabsTrigger>
              </TabsList>
              <TabsContent value="liked">
                <div className="overflow-y-auto max-h-[calc(100vh-300px)]">
                  {likedProperties.map((property) => (
                    <PropertyListing
                      key={property.id}
                      price={property.price}
                      address={property.address}
                      isSelected={selectedProperty?.id === property.id}
                      onClick={() => handlePropertyClick(property)}
                    />
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="bookmarked">
                <div className="overflow-y-auto max-h-[calc(100vh-300px)]">
                  {bookmarkedProperties.map((property) => (
                    <PropertyListing
                      key={property.id}
                      price={property.price}
                      address={property.address}
                      isSelected={selectedProperty?.id === property.id}
                      onClick={() => handlePropertyClick(property)}
                    />
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>

        {/* Main Content */}
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
              <PropertyActions
                currentProperty={currentProperty}
                onDislike={handleDislike}
                onBookmark={handleBookmark}
                onLike={handleLike}
                isBookmarked={bookmarkedProperties.some(prop => prop.id === currentProperty.id)}
              />
            </>
          )}
        </div>
      </div>

      {/* Mobile Toggle for User Panel */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t p-2">
        <Button 
          onClick={() => setShowUserPanel(!showUserPanel)} 
          className="w-full"
        >
          {showUserPanel ? 'Hide Profile' : 'Show Profile'}
        </Button>
      </div>
    </div>
  );
};

export default Index;
