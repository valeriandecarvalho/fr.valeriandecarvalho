const Modal = ({ isOpen, onClose, title, children }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-primary bg-opacity-60 flex items-center justify-center z-50">
            <div className="bg-royal p-6 rounded-xl max-w-xl w-full text-sm text-neutral-300">
                <h2 className="text-lg font-semibold mb-4">{title}</h2>
                {children}
                <button
                    onClick={onClose}
                    className="mt-4 bg-slate-800 hover:bg-slate-700 px-4 py-2 rounded text-white"
                >
                    Fermer
                </button>
            </div>
        </div>
    );
};

export default Modal;