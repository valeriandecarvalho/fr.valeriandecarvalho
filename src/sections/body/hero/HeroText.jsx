import { wavinghand } from "../../../assets";
import { FlipWords } from "./FlipWords";
import { motion } from "framer-motion";

const textSize = (min, vhRatio, max) =>
    `clamp(${min}rem, ${vhRatio}vh + ${vhRatio / 2}vw, ${max}rem)`;

const HeroText = ({ hideStatus = false }) => {
    const statusWords = ["Étudiant", "Freelance", "Développeur"];
    const opportunityWords = ["Stages", "Contacts", "Postes", "Missions", "Projets"];

    return (
        <header className="flex flex-col items-center justify-center text-center select-none leading-none">
            <motion.img
                initial={{ opacity: 0, scale: 0.25 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1 }}
                src={wavinghand}
                alt=""
                className="mb-3"
                style={{ width: textSize(1, 4, 3.5), height: textSize(1, 4, 3.5) }}
            />

            {!hideStatus && (
                <>
                    <motion.p
                        className="text-text"
                        initial={{ opacity: 0, scale: 0.25 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 1.2 }}
                        style={{ fontSize: textSize(0.6, 1, 0.9) }}
                    >
                        Je suis
                    </motion.p>

                    <motion.div
                        className="my-1"
                        initial={{ opacity: 0, scale: 0.25 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 1.4 }}
                        style={{ fontSize: textSize(0.875, 2, 1.5) }}
                    >
                        <FlipWords words={statusWords} className="text-inherit" />
                    </motion.div>
                </>
            )}

            <motion.p
                className="text-text"
                initial={{ opacity: 0, scale: 0.25 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.6 }}
                style={{ fontSize: textSize(0.875, 2, 1.5) }}
            >
                Je Recherche Des
            </motion.p>

            <motion.div
                initial={{ opacity: 0, scale: 0.25 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.8 }}
                style={{ fontSize: textSize(2, 4, 5) }}
            >
                <FlipWords words={opportunityWords} className="text-inherit" />
            </motion.div>
        </header>
    );
};

export default HeroText;