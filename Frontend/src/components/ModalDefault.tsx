import React, { ReactNode, useEffect, useState } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

const ModalDefault: React.FC<ModalProps> = ({ 
  isOpen, 
  onClose, 
  title, 
  children,
  size = 'md'
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      // Short delay to trigger enter animation
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 10);
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 10);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl'
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
      {/* Overlay */}
      <div 
        className={`fixed inset-0 bg-black transition-opacity duration-300 ${
          isVisible ? 'opacity-50' : 'opacity-0'
        }`}
        onClick={onClose}
      ></div>
      
      {/* Modal Container */}
      <div 
        className={`
          relative w-full ${sizeClasses[size]} mx-auto my-6 transition-all duration-300 transform
          ${isVisible 
            ? 'scale-100 opacity-100' 
            : 'scale-95 opacity-0'
          }
        `}
      >
        <div className="relative flex flex-col w-full bg-white border-2 border-blue-100 rounded-xl shadow-2xl outline-none focus:outline-none">
          {/* Modal Header */}
          <div className="flex items-center justify-between p-5 border-b border-solid border-blueGray-200 rounded-t-xl bg-blue-50">
            <h3 className="text-xl font-semibold text-gray-800">
              {title}
            </h3>
            <button
              className="
                text-gray-400 hover:text-gray-600 
                bg-transparent border-0 
                p-1 ml-auto text-3xl font-semibold 
                focus:outline-none transition-colors duration-200
              "
              onClick={onClose}
            >
              <span className="block w-6 h-6 text-2xl leading-none">
                ×
              </span>
            </button>
          </div>
          
          {/* Modal Body */}
          <div className="relative flex-auto p-6">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalDefault;