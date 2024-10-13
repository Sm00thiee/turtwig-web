import React from 'react';
import { Button } from '@/components/ui/button';
import { ThumbsUp, X, Bookmark } from 'lucide-react';
import { Property } from '../types/property';

interface PropertyActionsProps {
  currentProperty: Property;
  onDislike: () => void;
  onBookmark: () => void;
  onLike: () => void;
  isBookmarked: boolean;
}

const PropertyActions: React.FC<PropertyActionsProps> = ({
  currentProperty,
  onDislike,
  onBookmark,
  onLike,
  isBookmarked,
}) => {
  return (
    <div className="flex justify-center space-x-2 mt-4">
      <Button variant="destructive" className="w-1/4" onClick={onDislike}>
        <X className="w-4 h-4 mr-2" />
        Dislike
      </Button>
      <Button
        variant={isBookmarked ? "default" : "outline"}
        className={`w-1/4 ${isBookmarked ? "bg-yellow-500 hover:bg-yellow-600" : ""}`}
        onClick={onBookmark}
      >
        <Bookmark className="w-4 h-4 mr-2" />
        {isBookmarked ? "Unbookmark" : "Bookmark"}
      </Button>
      <Button variant="default" className="w-1/4 bg-green-500 hover:bg-green-600" onClick={onLike}>
        <ThumbsUp className="w-4 h-4 mr-2" />
        Like
      </Button>
    </div>
  );
};

export default PropertyActions;