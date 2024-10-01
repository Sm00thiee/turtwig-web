import React from 'react';
import { User } from 'lucide-react';

interface UserProfileProps {
  name: string;
  status: string;
}

const UserProfile: React.FC<UserProfileProps> = ({ name, status }) => {
  return (
    <div className="flex items-center p-4 bg-white rounded-lg shadow">
      <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
        <User className="w-6 h-6 text-gray-500" />
      </div>
      <div className="ml-4">
        <h2 className="text-lg font-semibold">{name}</h2>
        <p className="text-sm text-gray-500">{status}</p>
      </div>
    </div>
  );
};

export default UserProfile;