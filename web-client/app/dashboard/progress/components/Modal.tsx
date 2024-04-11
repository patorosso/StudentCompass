import React from "react";
import Image from "next/image";

interface ModalProps {
  title?: string;
  subtitle?: string;
  isOpen: boolean;
  hasCancelIcon?: boolean;
  hasCancelButton?: boolean;
  hasAcceptButton?: boolean;
  children: React.ReactNode;
  width?: string;
  height?: string;
  onClose: () => void;
  onAccept?: () => void;
}

const Modal = ({
  title,
  width,
  height,
  hasAcceptButton,
  hasCancelIcon,
  hasCancelButton,
  subtitle,
  isOpen,
  children,
  onClose,
  onAccept,
}: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black dark:bg-gray-500 dark:bg-opacity-55 bg-opacity-30 backdrop-blur-sm flex items-center justify-center z-50">
      <div
        className="flex flex-col bg-white dark:bg-slate-900 p-6 rounded-lg shadow-lg"
        style={{ height, width }}
      >
        <div className="flex justify-between">
          {title && (
            <h2 className="text-xl font-bold text-slate-600 dark:text-slate-400">
              {title}
            </h2>
          )}
          {hasCancelIcon && (
            <button onClick={onClose} className="select-none">
              <Image
                src="/cancel.svg"
                alt="Close"
                width={25}
                height={25}
                className="dark:hover:invert invert"
              />
            </button>
          )}
        </div>
        {subtitle && (
          <p className="my-6 text-slate-600 dark:text-slate-200">{subtitle}</p>
        )}

        <div className="flex-grow my-6">{children}</div>

        <div className="mt-auto">
          {hasCancelButton && (
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
          )}
          {!hasCancelButton && hasAcceptButton && (
            <button
              onClick={onAccept}
              className="p-4 bg-blue-500 text-white rounded hover:bg-blue-600 w-full text-center"
            >
              Accept
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;
