import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { X } from 'lucide-react';

interface MessagingScreenProps {
  property: {
    price: string;
    address: string;
  };
  onClose: () => void;
}

const MessagingScreen: React.FC<MessagingScreenProps> = ({ property, onClose }) => {
  const [message, setMessage] = useState('');

  const handleSendMessage = () => {
    // Here you would typically send the message to a backend
    console.log('Sending message:', message);
    setMessage('');
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Chat about {property.address}</h2>
        <Button variant="ghost" onClick={onClose}>
          <X className="w-6 h-6" />
        </Button>
      </div>
      <div className="mb-4">
        <p className="font-semibold">Price: {property.price}</p>
        <p>Address: {property.address}</p>
      </div>
      <div className="h-64 bg-gray-100 rounded-lg mb-4 p-4 overflow-y-auto">
        {/* Chat messages would be displayed here */}
        <p className="text-gray-500">No messages yet. Start the conversation!</p>
      </div>
      <div className="flex">
        <Input
          type="text"
          placeholder="Type your message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="flex-grow mr-2"
        />
        <Button onClick={handleSendMessage}>Send</Button>
      </div>
    </div>
  );
};

export default MessagingScreen;