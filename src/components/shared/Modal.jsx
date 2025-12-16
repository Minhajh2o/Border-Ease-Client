import { HiOutlineX } from 'react-icons/hi';

const Modal = ({ isOpen, onClose, title, children }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div 
                className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                onClick={onClose}
            ></div>
            
            {/* Modal Content */}
            <div className="relative bg-base-100 rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-hidden animate-in fade-in zoom-in duration-200">
                {/* Header */}
                <div className="flex items-center justify-between p-5 border-b border-base-300">
                    <h3 className="text-lg font-semibold">{title}</h3>
                    <button 
                        onClick={onClose}
                        className="btn btn-ghost btn-circle btn-sm"
                    >
                        <HiOutlineX className="w-5 h-5" />
                    </button>
                </div>
                
                {/* Body */}
                <div className="p-5 overflow-y-auto max-h-[calc(90vh-80px)]">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Modal;
