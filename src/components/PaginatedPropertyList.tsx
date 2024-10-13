import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchPaginatedProperties } from '../utils/api';
import { PropertyInfo } from '../types/property';
import { PaginationRequest } from '../types/pagination';
import PropertyListing from './PropertyListing';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';

const PaginatedPropertyList: React.FC = () => {
  const [paginationRequest, setPaginationRequest] = useState<PaginationRequest>({
    pageIndex: 1,
    pageSize: 10,
    sortBy: '',
    isDescending: true,
  });

  const { data, isLoading, error } = useQuery({
    queryKey: ['paginatedProperties', paginationRequest],
    queryFn: () => fetchPaginatedProperties(paginationRequest),
  });

  const handlePageChange = (newPageIndex: number) => {
    setPaginationRequest(prev => ({ ...prev, pageIndex: newPageIndex }));
  };

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setPaginationRequest(prev => ({ ...prev, sortBy: event.target.value }));
  };

  const handleOrderChange = () => {
    setPaginationRequest(prev => ({ ...prev, isDescending: !prev.isDescending }));
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {(error as Error).message}</div>;

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <Select value={paginationRequest.sortBy} onChange={handleSortChange}>
          <option value="">Sort by</option>
          <option value="Price">Price</option>
          <option value="PublishDateTime">Publish Date</option>
        </Select>
        <Button onClick={handleOrderChange}>
          {paginationRequest.isDescending ? 'Descending' : 'Ascending'}
        </Button>
      </div>
      <div className="space-y-2">
        {data?.items.map((property: PropertyInfo) => (
          <PropertyListing key={property.Id} property={property} />
        ))}
      </div>
      <div className="flex justify-between items-center">
        <Button
          onClick={() => handlePageChange(paginationRequest.pageIndex - 1)}
          disabled={paginationRequest.pageIndex === 1}
        >
          Previous
        </Button>
        <span>
          Page {data?.pageIndex} of {data?.totalPages}
        </span>
        <Button
          onClick={() => handlePageChange(paginationRequest.pageIndex + 1)}
          disabled={data?.pageIndex === data?.totalPages}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default PaginatedPropertyList;