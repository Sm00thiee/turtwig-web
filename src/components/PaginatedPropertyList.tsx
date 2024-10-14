import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchPaginatedProperties } from '../utils/api';
import { PropertyInfo } from '../types/property';
import { PaginationRequest } from '../types/pagination';
import PropertyDetails from './PropertyDetails';
import PropertyActions from './PropertyActions';
import PropertyList from './PropertyList';

const PaginatedPropertyList: React.FC = () => {
  const [paginationRequest, setPaginationRequest] = useState<PaginationRequest>({
    pageIndex: 1,
    pageSize: 1,
    sortBy: '',
    isDescending: true,
  });

  const [currentPropertyIndex, setCurrentPropertyIndex] = useState(0);
  const [likedProperties, setLikedProperties] = useState<PropertyInfo[]>([]);
  const [bookmarkedProperties, setBookmarkedProperties] = useState<PropertyInfo[]>([]);

  const { data, isLoading, error } = useQuery({
    queryKey: ['paginatedProperties', paginationRequest],
    queryFn: () => fetchPaginatedProperties(paginationRequest),
  });

  useEffect(() => {
    const storedLikedProperties = localStorage.getItem('likedProperties');
    const storedBookmarkedProperties = localStorage.getItem('bookmarkedProperties');
    
    if (storedLikedProperties) {
      setLikedProperties(JSON.parse(storedLikedProperties));
    }
    if (storedBookmarkedProperties) {
      setBookmarkedProperties(JSON.parse(storedBookmarkedProperties));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('likedProperties', JSON.stringify(likedProperties));
  }, [likedProperties]);

  useEffect(() => {
    localStorage.setItem('bookmarkedProperties', JSON.stringify(bookmarkedProperties));
  }, [bookmarkedProperties]);

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
        // Remove from bookmarks if already bookmarked
        setBookmarkedProperties(prev => prev.filter(p => p.id !== currentProperty.id));
      } else {
        // Add to bookmarks if not already bookmarked
        setBookmarkedProperties(prev => [...prev, currentProperty]);
      }
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {(error as Error).message}</div>;

  const currentProperty = data?.items[currentPropertyIndex];

  return (
    <div className="flex">
      <div className="w-1/3 pr-4">
        <PropertyList
          likedProperties={likedProperties}
          bookmarkedProperties={bookmarkedProperties}
        />
      </div>
      <div className="w-2/3">
        {currentProperty && (
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
        )}
      </div>
    </div>
  );
};

export default PaginatedPropertyList;