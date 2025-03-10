import React, { ReactNode, useEffect, useState } from 'react';
import Button from './Button';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  gridColumns?: 1 | 2 | 3 | 4;
  showSaveBtn?: boolean;
  saveButtonText?: string;
  onSubmitClicked?: () => void;
  closeButtonText?: string;
  hideFooter?: boolean;
  modalWidth?: string;
}

const Modal: React.FC<ModalProps> = ({ 
  isOpen, 
  onClose, 
  title, 
  children,
  gridColumns = 1,
  showSaveBtn = false,
  saveButtonText = 'Save changes',
  onSubmitClicked,
  closeButtonText = 'Close',
  hideFooter = false,
  modalWidth = '100%'
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 10);
      return () => clearTimeout(timer);
    } else {
      setIsVisible(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const gridClass = {
    1: 'grid-cols-1',
    2: 'grid-cols-2',
    3: 'grid-cols-3',
    4: 'grid-cols-4'
  }[gridColumns];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-x-hidden overflow-y-auto">
      {/* Overlay */}
      <div 
        className={`
          fixed inset-0 bg-black transition-opacity duration-300 
          ${isVisible ? 'opacity-50' : 'opacity-0'}
        `}
        onClick={onClose}
      ></div>
      
      {/* Modal Container */}
      <div 
        className={`
          flex justify-center
          relative w-full max-w-4xl mx-auto my-auto transition-all duration-300 transform
          ${isVisible 
            ? 'scale-100 opacity-100' 
            : 'scale-95 opacity-0'
          }
        `}
      >
        <div className={`
          flex flex-col max-h-[90vh] 
          bg-white border-2 border-blue-100 
          rounded-xl shadow-2xl 
          overflow-hidden
        `}
        style={{ width: modalWidth }} >
          {/* Modal Header */}
          <div className="
            flex items-center justify-between 
            p-5 border-b border-solid 
            border-gray-300 
            bg-gray-50 
            rounded-t-xl
          ">
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
          <div className="
            relative flex-auto p-6 
            overflow-y-auto 
            scrollbar-thin scrollbar-thumb-blue-200 scrollbar-track-blue-50
          ">
            <div className={`grid ${gridClass} gap-4`}>
              {children}
            </div>
          </div>

          {/* Modal Footer */}
          {!hideFooter && (
            <div className="
              flex justify-end space-x-3 
              p-4 border-t border-gray-200 
              bg-gray-50
            ">
              <Button 
            type="button"
            variant="secondary"
            onClick={onClose}
          >
            {closeButtonText}
          </Button>
              {showSaveBtn && (
                <Button 
                type="submit"
                onClick={onSubmitClicked} 
              >
                {saveButtonText}
              </Button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;