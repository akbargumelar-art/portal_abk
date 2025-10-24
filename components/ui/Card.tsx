import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
  actions?: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ children, className = '', title, actions }) => {
  return (
    <div className={`bg-white rounded-xl shadow-md p-6 transition-shadow duration-300 hover:shadow-lg ${className}`}>
      {(title || actions) && (
        <div className="flex justify-between items-center mb-4 border-b pb-3">
          {title && <h3 className="text-lg font-semibold text-telkomsel-gray-800">{title}</h3>}
          {actions && <div>{actions}</div>}
        </div>
      )}
      {children}
    </div>
  );
};

export default Card;
