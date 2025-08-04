import { wavinghand } from "../../../assets";
import { FlipWords } from "./FlipWords";
import { motion } from "framer-motion";

const textSize = (min, vhRatio, max) =>
    `clamp(${min}rem, ${vhRatio}vh + ${vhRatio/2}vw, ${max}rem)`;

const HeroText = () => {
    const words = ["Stages", "Contacts", "Postes", "Missions", "Projets"];

    return (
        <header className="flex flex-col items-center justify-center text-center select-none leading-none">
            <motion.div
                initial={{ opacity: 0, scale: 0.25 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1 }}
            >
                <img
                    src={wavinghand}
                    alt=""
                    className="inline"
                    style={{
                        width: textSize(1.5, 3, 2.5),
                        height: textSize(1.5, 3, 2.5)
                    }}
                />
                <h1
                    className="sm:inline hidden ml-2"
                    style={{ fontSize: textSize(0.75, 1.5, 1.25) }}
                >
                    , je suis Valérian De Carvalho
                </h1>
            </motion.div>

            <motion.h2
                className="text-text my-1"
                initial={{ opacity: 0, scale: 0.25 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.2 }}
                style={{ fontSize: textSize(0.875, 2, 1.5) }}
            >
                Étudiant en Informatique
            </motion.h2>

            <motion.p
                className="text-text"
                initial={{ opacity: 0, scale: 0.25 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.4 }}
                style={{ fontSize: textSize(0.75, 1.5, 1.25) }}
            >
                Je Recherche Des
            </motion.p>

            <motion.div
                initial={{ opacity: 0, scale: 0.25 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.6 }}
                style={{ fontSize: textSize(1, 5, 6) }}
            >
                <FlipWords words={words} className="text-inherit" />
            </motion.div>
        </header>
    );
};

export default HeroText;