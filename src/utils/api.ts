import axios from 'axios';
import { PropertyInfo } from "../types/property";
import { PaginationRequest, PaginationBaseResponse } from "../types/pagination";
import config from "../config.json";
import { User } from "@/types/user";

// Mock data for properties
const mockProperties: PropertyInfo[] = [
  {
    Id: "1",
    Name: "Cozy Apartment",
    Description: "A beautiful apartment in the heart of the city",
    MediaUrls: [
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    ],
    Address: "18 Ngoc Tu Gate, Van Mieu, Dong Da, Ha Noi",
    Price: "9.0 million/month",
    UpvoteUsers: [],
    InterestCount: "5",
    IsPublished: true,
    UserId: "user123",
    PublishDateTime: new Date().toISOString(),
    CreatedDate: new Date().toISOString(),
    LastModifiedDate: new Date().toISOString(),
  },
  // ... Add more mock properties here
];

// Mock data for user
const mockUser: User = {
  Avatar: "https://example.com/avatar.jpg",
  Email: "johndoe@example.com",
  Username: "johndoe",
  FirstName: "John",
  LastName: "Doe",
  Phone: "+1234567890",
  Dob: "1990-01-01",
  Gender: "Male",
  Address: "123 Main St, City, Country",
  Language: "English",
};

export const fetchProperties = async (): Promise<PropertyInfo[]> => {
  try {
    const response = await axios.get(`${config.apiHost}${config.apiPaths.properties}`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching properties:", error);
    return mockProperties;
  }
};

export const fetchUser = async (): Promise<User> => {
  try {
    const response = await axios.get(`${config.apiHost}${config.apiPaths.user}`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching user data:", error);
    return mockUser;
  }
};

export const fetchPaginatedProperties = async (
  paginationRequest: PaginationRequest
): Promise<PaginationBaseResponse<PropertyInfo>> => {
  try {
    const response = await axios.post(`${config.apiHost}/api/properties`, paginationRequest, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching paginated properties:", error);
    throw error;
  }
};

// Add a new utility function for making authenticated requests
export const authenticatedFetch = async (url: string, options: any = {}) => {
  try {
    const response = await axios({
      url,
      ...options,
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error(`HTTP error! status: ${(error as any).response?.status}`);
    throw error;
  }
};