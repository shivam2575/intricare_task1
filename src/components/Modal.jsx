const Modal = ({ open, title, children, onClose }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative z-10 w-full max-w-2xl bg-white rounded-2xl shadow-xl p-6">
        <div className="flex items-center justify-center mb-4">
          <h2 className="text-lg font-semibold">{title}</h2>
          <button
            className="rounded-full px-3 py-1 text-sm border hover:bg-gray-50 cursor-pointer"
            onClick={onClose}
            aria-label="Close"
          >
            x
          </button>
        </div>
      </div>
      {children}
    </div>
  );
};

export default Modal;
