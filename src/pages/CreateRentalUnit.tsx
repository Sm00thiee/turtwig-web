import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { authenticatedFetch } from '../utils/api';

const CreateRentalUnit: React.FC = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [address, setAddress] = useState('');
  const [price, setPrice] = useState('');
  const [isPublished, setIsPublished] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await authenticatedFetch(`${import.meta.env.VITE_API_HOST}/api/properties`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          Name: name,
          Description: description,
          Address: address,
          Price: price,
          IsPublished: isPublished,
          MediaUrls: [], // Initialize as empty array
          UpvoteUsers: [], // Initialize as empty array
          InterestCount: "0", // Initialize as "0"
          PublishDateTime: new Date().toISOString(),
        }),
      });

      toast({
        title: "Success",
        description: "Rental unit created successfully",
      });
      navigate('/'); // Redirect to home page or property list
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create rental unit",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Create New Rental Unit</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
          <Input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
          <Textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
          <Input
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price</label>
          <Input
            id="price"
            type="text"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>
        <div className="flex items-center space-x-2">
          <Switch
            id="isPublished"
            checked={isPublished}
            onCheckedChange={setIsPublished}
          />
          <label htmlFor="isPublished" className="text-sm font-medium text-gray-700">
            Publish Immediately
          </label>
        </div>
        <Button type="submit">Create Rental Unit</Button>
      </form>
    </div>
  );
};

export default CreateRentalUnit;