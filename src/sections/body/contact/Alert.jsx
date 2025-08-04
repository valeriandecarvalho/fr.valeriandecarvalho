import { motion, AnimatePresence } from "motion/react";

const Alert = ({ type, text }) => {
    const alertVariants = {
        hidden: { opacity: 0, y: 50, scale: 0.8 },
        visible: { opacity: 1, y: 0, scale: 1 },
        exit: { opacity: 0, y: -50, scale: 0.8 },
    };

    return (
        <AnimatePresence>
            <motion.div
                className="fixed z-50 bottom-5 right-5"
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={alertVariants}
                transition={{ duration: 0.3, ease: "easeInOut" }}
            >
                <div className={`p-4 rounded-lg border flex items-center space-x-3 ${
                    type === "danger"
                        ? "bg-red-900/80 border-red-500/50 text-red-200"
                        : "bg-storm border-secondary/20 text-text"
                }`}>
                    <div className={`w-2 h-2 rounded-full ${
                        type === "danger" ? "bg-red-500" : "bg-hover"
                    }`}></div>
                    <p className="text-sm font-medium">{text}</p>
                </div>
            </motion.div>
        </AnimatePresence>
    );
};

export default Alert;