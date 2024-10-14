import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PropertyInfo } from '../types/property';

interface PropertyListProps {
  likedProperties: PropertyInfo[];
  bookmarkedProperties: PropertyInfo[];
  onPropertyClick: (property: PropertyInfo) => void;
}

const PropertyList: React.FC<PropertyListProps> = ({
  likedProperties,
  bookmarkedProperties,
  onPropertyClick
}) => {
  return (
    <Tabs defaultValue="liked" className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="liked">Liked Units</TabsTrigger>
        <TabsTrigger value="bookmarked">Bookmarked</TabsTrigger>
      </TabsList>
      <TabsContent value="liked">
        <div className="space-y-2">
          {likedProperties.map((property) => (
            <div 
              key={property.id} 
              className="p-2 border rounded cursor-pointer hover:bg-gray-100"
              onClick={() => onPropertyClick(property)}
            >
              <h3 className="font-bold">{property.price}</h3>
              <p className="text-sm">{property.address}</p>
            </div>
          ))}
        </div>
      </TabsContent>
      <TabsContent value="bookmarked">
        <div className="space-y-2">
          {bookmarkedProperties.map((property) => (
            <div 
              key={property.id} 
              className="p-2 border rounded cursor-pointer hover:bg-gray-100"
              onClick={() => onPropertyClick(property)}
            >
              <h3 className="font-bold">{property.price}</h3>
              <p className="text-sm">{property.address}</p>
            </div>
          ))}
        </div>
      </TabsContent>
    </Tabs>
  );
};

export default PropertyList;