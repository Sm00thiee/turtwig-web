import React from 'react';
import { X } from 'lucide-react';

interface FullSizeImageModalProps {
  imageUrl: string;
  onClose: () => void;
}

const FullSizeImageModal: React.FC<FullSizeImageModalProps> = ({ imageUrl, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
      <div className="relative max-w-4xl max-h-full">
        <img src={imageUrl} alt="Full size" className="max-w-full max-h-[90vh] object-contain" />
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white hover:text-gray-300"
        >
          <X size={24} />
        </button>
      </div>
    </div>
  );
};

export default FullSizeImageModal;