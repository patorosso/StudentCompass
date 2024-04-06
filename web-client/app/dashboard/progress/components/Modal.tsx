import React from "react";

interface ModalProps {
  title: string;
  subtitle: string;
  isOpen: boolean;
  children: React.ReactNode;
  onClose: () => void;
  onAccept: () => void;
}

const Modal = ({
  title,
  subtitle,
  isOpen,
  children,
  onClose,
  onAccept,
}: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white dark:bg-slate-500 p-6 rounded-lg shadow-lg w-1/3">
        <h2 className="text-3xl font-bold text-slate-600 dark:text-slate-200">
          {title}
        </h2>
        <p className="my-6 text-slate-600 dark:text-slate-200">{subtitle}</p>
        <div className="my-6">{children}</div>
        <div className="flex justify-end space-x-2">
          <button
            onClick={onAccept}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Accept
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-600 rounded hover:bg-gray-400"
          >
            Exit
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
