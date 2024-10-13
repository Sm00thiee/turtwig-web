import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import UserProfile from '@/components/UserProfile';
import PropertyList from '@/components/PropertyList';
import PropertyDetails from '@/components/PropertyDetails';
import MessagingScreen from '@/components/MessagingScreen';
import PropertyActions from '@/components/PropertyActions';
import { toast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Property } from '../types/property';
import { User } from '../types/user';
import { fetchProperties, fetchUser } from '../utils/api';

const Index = () => {
  const [currentPropertyIndex, setCurrentPropertyIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [likedProperties, setLikedProperties] = useState<Property[]>([]);
  const [bookmarkedProperties, setBookmarkedProperties] = useState<Property[]>([]);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [showUserPanel, setShowUserPanel] = useState(false);

  const { data: properties, isLoading: propertiesLoading } = useQuery({
    queryKey: ['properties'],
    queryFn: fetchProperties,
  });

  const { data: user, isLoading: userLoading } = useQuery({
    queryKey: ['user'],
    queryFn: fetchUser,
  });

  const publishedProperties = properties?.filter(prop => prop.IsPublished) || [];
  const currentProperty = publishedProperties[currentPropertyIndex];

  const handleLike = () => {
    if (currentProperty && !likedProperties.some(prop => prop.Id === currentProperty.Id)) {
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
    if (currentProperty) {
      const isBookmarked = bookmarkedProperties.some(prop => prop.Id === currentProperty.Id);
      if (isBookmarked) {
        setBookmarkedProperties(bookmarkedProperties.filter(prop => prop.Id !== currentProperty.Id));
        showToast("Removed from Bookmarks", "This property has been removed from your bookmarks.");
      } else {
        setBookmarkedProperties([...bookmarkedProperties, currentProperty]);
        showToast("Bookmarked!", "You bookmarked this property.");
      }
    }
  };

  const moveToNextProperty = () => {
    if (publishedProperties.length > 0) {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentPropertyIndex((prevIndex) => (prevIndex + 1) % publishedProperties.length);
        setIsAnimating(false);
      }, 300);
    }
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

  if (propertiesLoading || userLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <div className="flex-1 flex flex-col md:flex-row">
        {/* User Panel */}
        <div className={`bg-white md:w-1/4 md:min-h-screen transition-all duration-300 ease-in-out ${showUserPanel ? 'h-screen md:h-auto' : 'h-0 md:h-auto'} overflow-hidden`}>
          <div className="p-4">
            {user && <UserProfile user={user} />}
            <PropertyList
              likedProperties={likedProperties}
              bookmarkedProperties={bookmarkedProperties}
              selectedProperty={selectedProperty}
              onPropertyClick={handlePropertyClick}
            />
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-4 md:p-8 flex flex-col">
          {selectedProperty ? (
            <MessagingScreen property={selectedProperty} onClose={() => setSelectedProperty(null)} />
          ) : currentProperty ? (
            <>
              <PropertyDetails 
                property={currentProperty}
                isAnimating={isAnimating}
              />
              <PropertyActions
                currentProperty={currentProperty}
                onDislike={handleDislike}
                onBookmark={handleBookmark}
                onLike={handleLike}
                isBookmarked={bookmarkedProperties.some(prop => prop.Id === currentProperty.Id)}
              />
            </>
          ) : null}
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