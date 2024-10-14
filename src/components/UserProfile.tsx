import React, { useState, useEffect } from 'react';
import { User as UserIcon } from 'lucide-react';
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
import { PropertyInfo } from '../types/property';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface UserProfileProps {
  user: User;
}

const UserProfile: React.FC<UserProfileProps> = ({ user }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [likedProperties, setLikedProperties] = useState<PropertyInfo[]>([]);
  const [bookmarkedProperties, setBookmarkedProperties] = useState<PropertyInfo[]>([]);

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

  return (
    <div className="space-y-4">
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button variant="ghost" className="w-full flex items-center p-4 bg-white rounded-lg shadow hover:bg-gray-50">
            <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
              {user.avatar ? (
                <img src={user.avatar} alt={user.username} className="w-full h-full object-cover rounded-full" />
              ) : (
                <UserIcon className="w-6 h-6 text-gray-500" />
              )}
            </div>
            <div className="ml-4 text-left">
              <h2 className="text-lg font-semibold">{user.username}</h2>
              <p className="text-sm text-gray-500">{user.email}</p>
            </div>
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>User Profile</DialogTitle>
          </DialogHeader>
          <UserProfileModal user={user} />
        </DialogContent>
      </Dialog>

      <Tabs defaultValue="liked" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="liked">Liked Units</TabsTrigger>
          <TabsTrigger value="bookmarked">Bookmarked</TabsTrigger>
        </TabsList>
        <TabsContent value="liked">
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {likedProperties.map((property) => (
              <div key={property.id} className="p-2 border rounded">
                <h3 className="font-bold">{property.price}</h3>
                <p className="text-sm">{property.address}</p>
              </div>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="bookmarked">
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {bookmarkedProperties.map((property) => (
              <div key={property.id} className="p-2 border rounded">
                <h3 className="font-bold">{property.price}</h3>
                <p className="text-sm">{property.address}</p>
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default UserProfile;