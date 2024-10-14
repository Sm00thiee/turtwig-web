import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchPaginatedProperties } from '../utils/api';
import { PropertyInfo } from '../types/property';
import { PaginationRequest } from '../types/pagination';
import PropertyDetails from './PropertyDetails';
import PropertyActions from './PropertyActions';
import PropertyList from './PropertyList';
import MessagingScreen from './MessagingScreen';
import { Button } from '@/components/ui/button';
import { Filter, List, Grid } from 'lucide-react';

const PaginatedPropertyList: React.FC = () => {
  const [paginationRequest, setPaginationRequest] = useState<PaginationRequest>({
    pageIndex: 1,
    pageSize: 10,
    sortBy: '',
    isDescending: true,
  });

  const [currentPropertyIndex, setCurrentPropertyIndex] = useState(0);
  const [likedProperties, setLikedProperties] = useState<PropertyInfo[]>([]);
  const [bookmarkedProperties, setBookmarkedProperties] = useState<PropertyInfo[]>([]);
  const [selectedProperty, setSelectedProperty] = useState<PropertyInfo | null>(null);
  const [viewMode, setViewMode] = useState<'explorer' | 'listing'>('explorer');

  const { data, isLoading, error } = useQuery({
    queryKey: ['paginatedProperties', paginationRequest],
    queryFn: () => fetchPaginatedProperties(paginationRequest),
  });

  const handleNextProperty = () => {
    if (data && currentPropertyIndex < data.items.length - 1) {
      setCurrentPropertyIndex(prev => prev + 1);
    } else {
      setPaginationRequest(prev => ({ ...prev, pageIndex: prev.pageIndex + 1 }));
      setCurrentPropertyIndex(0);
    }
  };

  const handleLike = () => {
    if (currentProperty && !likedProperties.some(p => p.id === currentProperty.id)) {
      setLikedProperties(prev => [...prev, currentProperty]);
    }
    handleNextProperty();
  };

  const handleBookmark = () => {
    if (currentProperty) {
      if (bookmarkedProperties.some(p => p.id === currentProperty.id)) {
        setBookmarkedProperties(prev => prev.filter(p => p.id !== currentProperty.id));
      } else {
        setBookmarkedProperties(prev => [...prev, currentProperty]);
      }
    }
  };

  const handlePropertyClick = (property: PropertyInfo) => {
    setSelectedProperty(property);
  };

  const handleCloseChat = () => {
    setSelectedProperty(null);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {(error as Error).message}</div>;

  const currentProperty = data?.items[currentPropertyIndex];

  return (
    <div className="flex flex-col h-screen">
      <div className="flex justify-between items-center p-4 bg-gray-100">
        <div className="flex space-x-2">
          <Button
            variant={viewMode === 'explorer' ? 'default' : 'outline'}
            onClick={() => setViewMode('explorer')}
          >
            Units Explorer
          </Button>
          <Button
            variant={viewMode === 'listing' ? 'default' : 'outline'}
            onClick={() => setViewMode('listing')}
          >
            Units Listing
          </Button>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
          <Button variant="outline">
            <List className="w-4 h-4 mr-2" />
          </Button>
          <Button variant="outline">
            <Grid className="w-4 h-4 mr-2" />
          </Button>
        </div>
      </div>
      <div className="flex flex-1 overflow-hidden">
        <div className="w-1/3 overflow-y-auto border-r">
          <PropertyList
            properties={data?.items || []}
            onPropertyClick={handlePropertyClick}
          />
        </div>
        <div className="w-2/3 overflow-y-auto">
          {selectedProperty ? (
            <MessagingScreen property={selectedProperty} onClose={handleCloseChat} />
          ) : currentProperty ? (
            <>
              <PropertyDetails property={currentProperty} isAnimating={false} />
              <PropertyActions
                currentProperty={currentProperty}
                onDislike={handleNextProperty}
                onBookmark={handleBookmark}
                onLike={handleLike}
                isBookmarked={bookmarkedProperties.some(p => p.id === currentProperty.id)}
              />
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default PaginatedPropertyList;