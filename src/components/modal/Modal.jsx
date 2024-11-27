"use client";

const Modal = ({
  isOpen,
  onClose,
  children,
  maxWidth = "max-w-lg",
  maxHeight = "max-h-[90vh]",
  position = "fixed inset-0 bg-gray-900 bg-opacity-50",
  // position = "absolute mt-2 right-0",
}) => {
  if (!isOpen) return null;

  return (
    <div
      className={`${position} flex items-center justify-center z-[900]`}
      onClick={onClose}
    >
      <div
        className={`bg-white p-6 rounded-xl shadow-2xl ${maxHeight} relative ${maxWidth}`}
        onClick={(e) => e.stopPropagation()} // Prevent click events from closing the modal when clicking inside it
      >
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-xl"
          onClick={onClose}
        >
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
