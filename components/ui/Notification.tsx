import React, { useEffect } from 'react';
import { CheckCircleIcon, XCircleIcon as XCircleSolid, XMarkIcon } from '@heroicons/react/24/solid';

interface NotificationProps {
  message: string;
  type: 'success' | 'error';
  onClose: () => void;
}

const Notification: React.FC<NotificationProps> = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const isSuccess = type === 'success';

  return (
    <div className="fixed top-20 right-5 z-50 animate-fade-in-down">
      <div
        className={`flex items-center p-4 rounded-lg shadow-lg text-white ${
          isSuccess ? 'bg-green-500' : 'bg-red-600'
        }`}
      >
        {isSuccess ? (
          <CheckCircleIcon className="h-6 w-6 mr-3" />
        ) : (
          <XCircleSolid className="h-6 w-6 mr-3" />
        )}
        <span className="flex-1">{message}</span>
        <button
          onClick={onClose}
          className="ml-4 -mr-2 p-1 rounded-full hover:bg-white/20 transition-colors"
        >
          <XMarkIcon className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};

export default Notification;
