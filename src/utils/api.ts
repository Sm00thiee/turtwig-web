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
    UpvoteCount: "10",
    InterestCount: "5",
    IsPublished: true,
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
    const response = await fetch(
      `${config.apiHost}${config.apiPaths.properties}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch properties");
    }
    return response.json();
  } catch (error) {
    console.error("Error fetching properties:", error);
    return mockProperties;
  }
};

export const fetchUser = async (): Promise<User> => {
  try {
    const response = await fetch(`${config.apiHost}${config.apiPaths.user}`);
    if (!response.ok) {
      throw new Error("Failed to fetch user data");
    }
    return response.json();
  } catch (error) {
    console.error("Error fetching user data:", error);
    return mockUser;
  }
};

export const fetchPaginatedProperties = async (
  paginationRequest: PaginationRequest
): Promise<PaginationBaseResponse<PropertyInfo>> => {
  try {
    const response = await fetch(`${config.apiHost}/api/properties`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(paginationRequest),
    });

    if (!response.ok) {
      throw new Error("Failed to fetch paginated properties");
    }

    return response.json();
  } catch (error) {
    console.error("Error fetching paginated properties:", error);
    throw error;
  }
};
