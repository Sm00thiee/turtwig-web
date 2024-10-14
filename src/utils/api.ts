import { PaginationRequest, PaginationBaseResponse } from '../types/pagination';
import { PropertyInfo } from '../types/property';
import { User } from '../types/user';
import config from '../config.json';

export const fetchPaginatedProperties = async (paginationRequest: PaginationRequest): Promise<PaginationBaseResponse<PropertyInfo>> => {
  try {
    const response = await fetch(`${config.apiHost}${config.apiPaths.properties}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(paginationRequest),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch properties');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching properties:', error);
    throw error;
  }
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
