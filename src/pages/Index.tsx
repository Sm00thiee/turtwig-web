import React from 'react';
import { useQuery } from '@tanstack/react-query';
import UserProfile from '@/components/UserProfile';
import PaginatedPropertyList from '@/components/PaginatedPropertyList';
import { fetchUser } from '../utils/api';

const Index = () => {
  const { data: user, isLoading: userLoading } = useQuery({
    queryKey: ['user'],
    queryFn: fetchUser,
  });

  if (userLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <div className="flex-1 flex flex-col md:flex-row">
        {/* User Panel */}
        <div className="bg-white md:w-1/4 md:min-h-screen p-4">
          {user && <UserProfile user={user} />}
        </div>

        {/* Main Content */}
        <div className="flex-1 p-4 md:p-8">
          <PaginatedPropertyList />
        </div>
      </div>
    </div>
  );
};

export default Index;