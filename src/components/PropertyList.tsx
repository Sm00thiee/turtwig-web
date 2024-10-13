import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import PropertyListing from './PropertyListing';
import { Property } from '../types/property';

interface PropertyListProps {
  likedProperties: Property[];
  bookmarkedProperties: Property[];
  selectedProperty: Property | null;
  onPropertyClick: (property: Property) => void;
}

const PropertyList: React.FC<PropertyListProps> = ({
  likedProperties,
  bookmarkedProperties,
  selectedProperty,
  onPropertyClick
}) => {
  return (
    <Tabs defaultValue="liked" className="mt-8">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="liked">Liked Units</TabsTrigger>
        <TabsTrigger value="bookmarked">Bookmarked</TabsTrigger>
      </TabsList>
      <TabsContent value="liked">
        <div className="overflow-y-auto max-h-[calc(100vh-300px)]">
          {likedProperties.map((property) => (
            <PropertyListing
              key={property.Id}
              property={property}
              isSelected={selectedProperty?.Id === property.Id}
              onClick={() => onPropertyClick(property)}
            />
          ))}
        </div>
      </TabsContent>
      <TabsContent value="bookmarked">
        <div className="overflow-y-auto max-h-[calc(100vh-300px)]">
          {bookmarkedProperties.map((property) => (
            <PropertyListing
              key={property.Id}
              property={property}
              isSelected={selectedProperty?.Id === property.Id}
              onClick={() => onPropertyClick(property)}
            />
          ))}
        </div>
      </TabsContent>
    </Tabs>
  );
};

export default PropertyList;