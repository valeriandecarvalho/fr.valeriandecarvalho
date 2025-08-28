const NexusPopup = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-40 bg-primary flex items-center justify-center"
            style={{ color: "white" }}
        >
            <div className="relative w-full h-full mt-24 p-8 overflow-auto">
                <p>Portfolio</p>
                <p className="cursor-pointer">Blog</p>
            </div>
        </div>
    );
};

export default NexusPopup;