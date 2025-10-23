import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
}

const Card: React.FC<CardProps> = ({ children, className = '', title }) => {
  return (
    <div className={`bg-white rounded-xl shadow-md p-6 transition-shadow duration-300 hover:shadow-lg ${className}`}>
      {title && <h3 className="text-lg font-semibold text-telkomsel-gray-800 mb-4 border-b pb-3">{title}</h3>}
      {children}
    </div>
  );
};

export default Card;