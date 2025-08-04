import { motion, useScroll, useTransform } from "framer-motion";

const HeroBackground = () => {
    const { scrollYProgress } = useScroll();

    const mountain3Y = useTransform(scrollYProgress, [0, 1], ["0%", "400%"]);
    const mountain2Y = useTransform(scrollYProgress, [0, 1], ["0%", "200%"]);

    return (
        <div className="relative w-full h-screen overflow-hidden">
            {/* Ciel */}
            <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: 'url(/assets/hero/sky.jpg)' }}
            />

            {/* Montagne 3 */}
            <motion.div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                    backgroundImage: 'url(/assets/hero/mountain-3.png)',
                    y: mountain3Y
                }}
            />

            {/* Montagne 2 */}
            <motion.div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                    backgroundImage: 'url(/assets/hero/mountain-2.png)',
                    y: mountain2Y
                }}
            />

            {/* Montagne 1 */}
            <div
                className="absolute inset-0 h-[100%] bg-cover bg-center z-20"
                style={{
                    backgroundImage: 'url(/assets/hero/mountain-1.png)',
                    backgroundPosition: "bottom",
                }}
            />
        </div>
    );
};

export default HeroBackground;