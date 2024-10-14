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
}

export type Property = PropertyInfo;