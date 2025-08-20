const Modal = ({ open, title, children, onClose }) => {
  if (!open) return;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <h2>{title}</h2>
      <button onClick={onClose}>x</button>
      {children}
    </div>
  );
};

export default Modal;
