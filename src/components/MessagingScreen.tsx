import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { X, Send } from 'lucide-react';

interface MessagingScreenProps {
  property: {
    price: string;
    address: string;
    images: string[];
    squareMeters: number;
    bedrooms: number;
    bathrooms: number;
  };
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
        <div>
          <h2 className="text-2xl font-bold">{property.price}</h2>
          <p className="text-sm text-gray-600">{property.address}</p>
        </div>
        <Button variant="ghost" onClick={onClose}>
          <X className="w-6 h-6" />
        </Button>
      </div>
      <div className="flex-grow flex overflow-hidden">
        {/* Left panel: Chat messages */}
        <div className="w-1/2 flex flex-col">
          <div className="flex-grow overflow-y-auto p-4">
            {/* Chat messages would be displayed here */}
            <p className="text-gray-500 text-center">No messages yet. Start the conversation!</p>
          </div>
          <div className="border-t p-4">
            <div className="flex items-center">
              <Input
                type="text"
                placeholder="Type your message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="flex-grow mr-2"
              />
              <Button onClick={handleSendMessage}>
                <Send className="w-4 h-4 mr-2" />
                Send
              </Button>
            </div>
          </div>
        </div>
        {/* Right panel: Property details */}
        <div className="w-1/2 border-l overflow-y-auto">
          <div className="p-4">
            <div className="flex flex-wrap gap-2 mb-4">
              {property.images.map((image, index) => (
                <img key={index} src={image} alt={`Property ${index + 1}`} className="w-24 h-24 object-cover rounded" />
              ))}
            </div>
            <div className="flex justify-between text-sm text-gray-600 mb-4">
              <span>{property.squareMeters} m²</span>
              <span>{property.bedrooms} bedrooms</span>
              <span>{property.bathrooms} bathrooms</span>
            </div>
            <div className="bg-gray-100 rounded-lg p-4 mb-4">
              <h3 className="font-semibold mb-2">Description</h3>
              <p className="text-sm">
                Welcome to this stunning, modern apartment located in the bustling city center. 
                This spacious {property.bedrooms}-bedroom apartment offers a comfortable 
                and stylish living space ideal for individuals or small families seeking 
                convenience and comfort.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessagingScreen;