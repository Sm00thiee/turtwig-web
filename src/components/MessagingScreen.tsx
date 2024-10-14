import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { X, Send, Home, Users, Bath, Wifi, Tv, Snowflake } from 'lucide-react';
import { PropertyInfo } from '../types/property';

interface MessagingScreenProps {
  property: PropertyInfo;
  onClose: () => void;
}

const MessagingScreen: React.FC<MessagingScreenProps> = ({ property, onClose }) => {
  const [message, setMessage] = useState('');

  const handleSendMessage = () => {
    console.log('Sending message:', message);
    setMessage('');
  };

  return (
    <div className="bg-white rounded-lg shadow-lg flex flex-col h-full">
      <div className="flex justify-between items-center p-4 border-b">
        <div className="flex items-center">
          <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white mr-3">
            <Home className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">{property.price}</h2>
            <p className="text-sm text-gray-600">{property.address}</p>
          </div>
        </div>
        <Button variant="ghost" onClick={onClose}>
          <X className="w-6 h-6" />
        </Button>
      </div>
      <div className="flex-grow flex overflow-hidden">
        {/* Left panel: Property details */}
        <div className="w-2/3 border-r overflow-y-auto">
          <div className="p-4">
            <div className="grid grid-cols-2 gap-2 mb-4">
              {property.mediaUrls.slice(0, 4).map((image, index) => (
                <img key={index} src={image} alt={`Property ${index + 1}`} className="w-full h-40 object-cover rounded" />
              ))}
            </div>
            <div className="mb-4">
              <h3 className="font-semibold mb-2">Descriptions</h3>
              <p className="text-sm">{property.description}</p>
            </div>
            <div className="mb-4">
              <h3 className="font-semibold mb-2">Key Features:</h3>
              <ul className="text-sm space-y-1">
                <li className="flex items-center"><Home className="w-4 h-4 mr-2" /> Size: 60m2</li>
                <li className="flex items-center"><Users className="w-4 h-4 mr-2" /> Bedrooms: 2</li>
                <li className="flex items-center"><Bath className="w-4 h-4 mr-2" /> Bathrooms: 1</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Amenities & Facilities:</h3>
              <ul className="text-sm space-y-1">
                <li className="flex items-center"><Snowflake className="w-4 h-4 mr-2" /> Air conditioning units</li>
                <li className="flex items-center"><Wifi className="w-4 h-4 mr-2" /> High-speed internet</li>
                <li className="flex items-center"><Tv className="w-4 h-4 mr-2" /> Cable TV</li>
              </ul>
            </div>
          </div>
        </div>
        {/* Right panel: Chat messages */}
        <div className="w-1/3 flex flex-col">
          <div className="flex-grow overflow-y-auto p-4">
            {/* Chat messages would be displayed here */}
            <p className="text-gray-500 text-center">Start a new conversation</p>
            <p className="text-gray-500 text-center text-sm">Remember to be friendly, respectful, and open-minded.</p>
          </div>
          <div className="border-t p-4">
            <div className="flex items-center">
              <Input
                type="text"
                placeholder="Write Something..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="flex-grow mr-2"
              />
              <Button onClick={handleSendMessage}>
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessagingScreen;