import React from 'react';
import UserProfile from '@/components/UserProfile';
import PropertyListing from '@/components/PropertyListing';
import PropertyDetails from '@/components/PropertyDetails';

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Left Sidebar */}
      <div className="w-1/4 p-4 bg-white border-r">
        <UserProfile name="John Doe" status="Active renter" />
        <h2 className="mt-8 mb-4 text-xl font-semibold">Units Listing</h2>
        <PropertyListing price="9.0 million/month" address="18 Ngoc Tu Gate, Van Mieu, Dong Da, Ha Noi" />
        <PropertyListing price="10.0 million/month" address="48 Xuan Dieu, Tay Ho, Dong Da, Ha Noi" isSelected={true} />
        <PropertyListing price="9.0 million/month" address="22 Lieu Giai, Ba Dinh, Ha Noi" />
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        <PropertyDetails 
          imageUrl="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
          price="10,000,000 đ/month"
          address="48 Xuan Dieu, Tay Ho, Dong Da, Ha Noi"
          postedTime="8 hours ago"
        />
      </div>
    </div>
  );
};

export default Index;