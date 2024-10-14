import React, { useState } from 'react';
import { User, Edit } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { User as UserType } from '../types/user';

interface UserProfileModalProps {
  user: UserType;
}

const UserProfileModal: React.FC<UserProfileModalProps> = ({ user }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState(user);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleSave = () => {
    setIsEditing(false);
    // Here you would typically send the updated data to your backend
    console.log('Saving user data:', userData);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
            {userData.avatar ? (
              <img src={userData.avatar} alt={userData.username} className="w-full h-full object-cover rounded-full" />
            ) : (
              <User className="w-8 h-8 text-gray-500" />
            )}
          </div>
          <h2 className="ml-4 text-2xl font-bold">{userData.firstName} {userData.lastName}</h2>
        </div>
        <Button variant="outline" size="sm" onClick={() => setIsEditing(!isEditing)}>
          <Edit className="w-4 h-4 mr-2" />
          {isEditing ? 'Cancel' : 'Edit'}
        </Button>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Personal Information</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              name="username"
              value={userData.username}
              onChange={handleInputChange}
              disabled={!isEditing}
            />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              value={userData.email}
              onChange={handleInputChange}
              disabled={!isEditing}
            />
          </div>
          <div>
            <Label htmlFor="firstName">First name</Label>
            <Input
              id="firstName"
              name="firstName"
              value={userData.firstName}
              onChange={handleInputChange}
              disabled={!isEditing}
            />
          </div>
          <div>
            <Label htmlFor="lastName">Last name</Label>
            <Input
              id="lastName"
              name="lastName"
              value={userData.lastName}
              onChange={handleInputChange}
              disabled={!isEditing}
            />
          </div>
          <div>
            <Label htmlFor="gender">Gender</Label>
            <Input
              id="gender"
              name="gender"
              value={userData.gender}
              onChange={handleInputChange}
              disabled={!isEditing}
            />
          </div>
          <div>
            <Label htmlFor="dob">DOB</Label>
            <Input
              id="dob"
              name="dob"
              value={userData.dob}
              onChange={handleInputChange}
              disabled={!isEditing}
            />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Contact Information</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="address">Address</Label>
            <Input
              id="address"
              name="address"
              value={userData.address || ''}
              onChange={handleInputChange}
              disabled={!isEditing}
            />
          </div>
          <div>
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              name="phone"
              value={userData.phone || ''}
              onChange={handleInputChange}
              disabled={!isEditing}
            />
          </div>
          <div>
            <Label htmlFor="language">Language</Label>
            <Input
              id="language"
              name="language"
              value={userData.language || ''}
              onChange={handleInputChange}
              disabled={!isEditing}
            />
          </div>
        </div>
      </div>

      {isEditing && (
        <Button className="w-full" onClick={handleSave}>Save Changes</Button>
      )}
    </div>
  );
};

export default UserProfileModal;