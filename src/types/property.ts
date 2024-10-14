export interface PropertyInfo {
  id: string;
  name?: string;
  description?: string;
  mediaUrls: string[];
  address?: string;
  price?: string;
  upvoteCount: number | null;
  interestCount?: string;
  isPublished: boolean;
  publishDateTime: string;
  createdDate: string;
  lastModifiedDate: string;
  size?: string;
  bedrooms?: number;
  bathrooms?: number;
}

export type Property = PropertyInfo;