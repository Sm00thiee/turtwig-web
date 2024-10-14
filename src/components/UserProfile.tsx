import React, { useState } from 'react';
import { User as UserIcon, Mail, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import UserProfileModal from './UserProfileModal';
import { User } from '../types/user';

interface UserProfileProps {
  user: User;
}

const UserProfile: React.FC<UserProfileProps> = ({ user }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center space-x-4 mb-4">
        <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
          {user.avatar ? (
            <img src={user.avatar} alt={user.username} className="w-full h-full object-cover rounded-full" />
          ) : (
            <UserIcon className="w-8 h-8 text-gray-500" />
          )}
        </div>
        <div>
          <h2 className="text-xl font-semibold">{user.firstName} {user.lastName}</h2>
          <p className="text-sm text-gray-500">@{user.username}</p>
        </div>
      </div>
      <div className="space-y-2 mb-4">
        <div className="flex items-center text-sm text-gray-600">
          <Mail className="w-4 h-4 mr-2" />
          {user.email}
        </div>
        {user.phone && (
          <div className="flex items-center text-sm text-gray-600">
            <Phone className="w-4 h-4 mr-2" />
            {user.phone}
          </div>
        )}
      </div>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" className="w-full">Edit Profile</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>User Profile</DialogTitle>
          </DialogHeader>
          <UserProfileModal user={user} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UserProfile;