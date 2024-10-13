import React from 'react';
import config from '../config.json';

interface GoogleMapProps {
  address: string;
}

const GoogleMap: React.FC<GoogleMapProps> = ({ address }) => {
  const encodedAddress = encodeURIComponent(address);
  const mapUrl = `https://www.google.com/maps/embed/v1/place?key=${config.googleMapsApiKey}&q=${encodedAddress}`;

  return (
    <iframe
      width="100%"
      height="100%"
      style={{ border: 0 }}
      loading="lazy"
      allowFullScreen
      src={mapUrl}
    ></iframe>
  );
};

export default GoogleMap;