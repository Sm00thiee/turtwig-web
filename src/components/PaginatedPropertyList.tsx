import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchPaginatedProperties } from '../utils/api';
import { PropertyInfo } from '../types/property';
import { PaginationRequest } from '../types/pagination';
import PropertyDetails from './PropertyDetails';
import PropertyActions from './PropertyActions';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const PaginatedPropertyList: React.FC = () => {
  const [paginationRequest, setPaginationRequest] = useState<PaginationRequest>({
    pageIndex: 1,
    pageSize: 1,
    sortBy: '',
    isDescending: true,
  });

  const [currentPropertyIndex, setCurrentPropertyIndex] = useState(0);

  const { data, isLoading, error } = useQuery({
    queryKey: ['paginatedProperties', paginationRequest],
    queryFn: () => fetchPaginatedProperties(paginationRequest),
  });

  const handleSortChange = (value: string) => {
    setPaginationRequest(prev => ({ ...prev, sortBy: value }));
  };

  const handleOrderChange = () => {
    setPaginationRequest(prev => ({ ...prev, isDescending: !prev.isDescending }));
  };

  const handleNextProperty = () => {
    if (data && currentPropertyIndex < data.items.length - 1) {
      setCurrentPropertyIndex(prev => prev + 1);
    } else {
      setPaginationRequest(prev => ({ ...prev, pageIndex: prev.pageIndex + 1 }));
      setCurrentPropertyIndex(0);
    }
  };

  const handlePreviousProperty = () => {
    if (currentPropertyIndex > 0) {
      setCurrentPropertyIndex(prev => prev - 1);
    } else if (paginationRequest.pageIndex > 1) {
      setPaginationRequest(prev => ({ ...prev, pageIndex: prev.pageIndex - 1 }));
      setCurrentPropertyIndex(data?.items.length ? data.items.length - 1 : 0);
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {(error as Error).message}</div>;

  const currentProperty = data?.items[currentPropertyIndex];

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <Select value={paginationRequest.sortBy} onValueChange={handleSortChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="price">Price</SelectItem>
            <SelectItem value="publishDateTime">Publish Date</SelectItem>
          </SelectContent>
        </Select>
        <Button onClick={handleOrderChange}>
          {paginationRequest.isDescending ? 'Descending' : 'Ascending'}
        </Button>
      </div>
      {currentProperty && (
        <>
          <PropertyDetails property={currentProperty} isAnimating={false} />
          <PropertyActions
            currentProperty={currentProperty}
            onDislike={handleNextProperty}
            onBookmark={() => {/* Implement bookmark logic */}}
            onLike={handleNextProperty}
            isBookmarked={false}
          />
        </>
      )}
      <div className="flex justify-between items-center">
        <Button onClick={handlePreviousProperty} disabled={paginationRequest.pageIndex === 1 && currentPropertyIndex === 0}>
          Previous
        </Button>
        <span>
          Property {currentPropertyIndex + 1} of {data?.totalCount || 0}
        </span>
        <Button onClick={handleNextProperty} disabled={paginationRequest.pageIndex === data?.totalPages && currentPropertyIndex === (data?.items.length || 0) - 1}>
          Next
        </Button>
      </div>
    </div>
  );
};

export default PaginatedPropertyList;