import React from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg p-4 shadow-lg relative w-[400px] max-h-[90vh] overflow-y-auto">
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-500">
          ×
        </button>
        <div className="flex flex-col items-center justify-center text-black"> {/* フレックスコンテナ化 */}
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
