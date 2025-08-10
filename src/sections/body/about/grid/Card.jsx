import { motion } from "motion/react";

const Card = ({ style, text, image, className = "", borderColor = "", containerRef }) => {
    return image && !text ? (
        <motion.div
            className="absolute w-16 h-16 rounded-full bg-white cursor-grab flex items-center justify-center p-2"
            style={{
                ...style,
                border: `5px solid ${borderColor}`
            }}
            whileHover={{ scale: 1.05 }}
            drag
            dragConstraints={containerRef}
            dragElastic={1}
        >
            <img
                className="w-full h-full object-contain pointer-events-none select-none"
                src={image}
                alt=""
                draggable={false}
            />
        </motion.div>
    ) : (
        <motion.div
            className={`absolute px-1 py-4 text-xl text-center rounded-full ring ring-gray-700 font-extralight cursor-grab ${className}`}
            style={style}
            whileHover={{ scale: 1.05 }}
            drag
            dragConstraints={containerRef}
            dragElastic={1}
        >
            {text}
        </motion.div>
    );
};

export default Card;