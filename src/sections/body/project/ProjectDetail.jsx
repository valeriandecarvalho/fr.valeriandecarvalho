import { motion } from "motion/react";
import { close, github, arrowup } from "../../../assets/index.js"

const ProjectDetail = ({ title, subtitle, description, subDescription, image, tags, href, closeModal }) => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm p-4">
            <motion.div
                className="relative w-full max-w-2xl max-h-[90vh] border border-text/10 shadow-sm rounded-2xl bg-primary overflow-auto"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
            >
                <button
                    onClick={closeModal}
                    className="absolute p-2 rounded-sm top-5 right-5 bg-primary hover:bg-blackolive z-10"
                >
                    <img src={close} className="w-6 h-6" />
                </button>

                <img src={image} alt={subtitle} className="w-full rounded-t-2xl" />

                <div className="p-5">
                    <h4 className="mb-0.5 text-2xl text-hover">{title}</h4>
                    <p className="mb-2 text-lg text-text">{subtitle}</p>
                    <p className="mb-3 font-normal text-text/70 font-sans">{description}</p>
                    {subDescription.map((subDesc, index) => (
                        <p key={index} className="mb-3 font-normal text-text/70 font-sans">{subDesc}</p>
                    ))}

                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-4">
                        <div className="flex flex-wrap gap-3 justify-center sm:justify-start mb-2 mt-2">
                            {tags.map((tag) => (
                                <img
                                    key={tag.id}
                                    src={tag.path}
                                    alt={tag.name}
                                    className="rounded-lg size-7.5 md:size-10 hover-animation"
                                />
                            ))}
                        </div>

                        {href && (
                            <a
                                href={href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center gap-2 px-4 py-2 font-medium cursor-pointer hover-animation text-text hover:text-hover bg-text/10 hover:bg-text/20 rounded-lg border border-text/20 transition-all duration-200"
                            >
                                <img src={github} alt="GitHub" className="w-5 h-5" />
                                GitHub
                                <img src={arrowup} className="size-4" />
                            </a>
                        )}
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default ProjectDetail;