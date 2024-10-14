import { PaginationRequest, PaginationBaseResponse } from '../types/pagination';
import { PropertyInfo } from '../types/property';
import { User } from '../types/user';

export const fetchPaginatedProperties = async (paginationRequest: PaginationRequest): Promise<PaginationBaseResponse<PropertyInfo>> => {
  // Simulating API call
  await new Promise(resolve => setTimeout(resolve, 1000));

  const mockProperties: PropertyInfo[] = [
    {
      id: '1',
      name: 'Cozy Apartment',
      description: 'A beautiful cozy apartment in the heart of the city',
      mediaUrls: ['https://example.com/image1.jpg', 'https://example.com/image2.jpg'],
      address: '123 Main St, Cityville',
      price: '$1000/month',
      upvoteCount: 10,
      interestCount: '5',
      isPublished: true,
      publishDateTime: '2023-03-15T10:00:00Z',
      createdDate: '2023-03-10T09:00:00Z',
      lastModifiedDate: '2023-03-14T14:30:00Z',
    },
    {
      id: '2',
      name: 'Spacious Loft',
      description: 'A modern loft with plenty of natural light',
      mediaUrls: ['https://example.com/image3.jpg', 'https://example.com/image4.jpg'],
      address: '456 Elm St, Townsville',
      price: '$1500/month',
      upvoteCount: 15,
      interestCount: '8',
      isPublished: true,
      publishDateTime: '2023-03-16T11:00:00Z',
      createdDate: '2023-03-12T10:00:00Z',
      lastModifiedDate: '2023-03-15T15:30:00Z',
    },
  ];

  const startIndex = (paginationRequest.pageIndex - 1) * paginationRequest.pageSize;
  const endIndex = startIndex + paginationRequest.pageSize;
  const paginatedItems = mockProperties.slice(startIndex, endIndex);

  return {
    items: paginatedItems,
    totalCount: mockProperties.length,
    pageIndex: paginationRequest.pageIndex,
    pageSize: paginationRequest.pageSize,
    totalPages: Math.ceil(mockProperties.length / paginationRequest.pageSize),
  };
};

export const fetchUser = async (): Promise<User> => {
  // Simulating API call
  await new Promise(resolve => setTimeout(resolve, 1000));

  const mockUser: User = {
    avatar: null,
    email: "rentee-john-doe@yopmail.com",
    username: "doeyjohn420",
    firstName: "John",
    lastName: "Doe",
    phone: null,
    dob: "2024-01-02",
    gender: "male",
    address: null,
    language: null
  };

  return mockUser;
};

export const likeProperty = async (propertyId: string): Promise<void> => {
  // Simulating API call
  await new Promise(resolve => setTimeout(resolve, 500));
  console.log(`Liked property with ID: ${propertyId}`);
};

export const bookmarkProperty = async (propertyId: string): Promise<void> => {
  // Simulating API call
  await new Promise(resolve => setTimeout(resolve, 500));
  console.log(`Bookmarked property with ID: ${propertyId}`);
};

export const updateUserProfile = async (updatedUser: Partial<User>): Promise<User> => {
  // Simulating API call
  await new Promise(resolve => setTimeout(resolve, 1000));
  console.log('Updated user profile:', updatedUser);
  
  const mockUser: User = {
    avatar: null,
    email: "rentee-john-doe@yopmail.com",
    username: "doeyjohn420",
    firstName: "John",
    lastName: "Doe",
    phone: null,
    dob: "2024-01-02",
    gender: "male",
    address: null,
    language: null
  };

  // In a real scenario, you would merge the updatedUser with the existing user data
  return {
    ...mockUser,
    ...updatedUser,
  };
};

export const authenticatedFetch = async (url: string, options: RequestInit = {}): Promise<any> => {
  try {
    const response = await fetch(url, {
      ...options,
      credentials: 'include',
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error in authenticatedFetch:', error);
    throw error;
  }
};
