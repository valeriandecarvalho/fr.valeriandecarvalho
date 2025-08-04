import React, { useState } from "react";
import ProjectDetail from "./ProjectDetail.jsx";
import { arrowright } from "../../../assets/index.js";

const ProjectList = ({ title, description, subDescription, href, image, tags }) => {
    const [isHidden, setIsHidden] = useState(false);

    return (
        <>
            <div className="flex flex-col md:flex-row items-center justify-between py-10 space-y-5 md:space-y-0 text-center md:text-left">
                <div>
                    <h3 className="text-xl md:text-2xl">{title}</h3>
                    <p className="mt-2 text-text/70 text-sm font-sans">{description}</p>
                    <div className="flex flex-wrap justify-center md:justify-start gap-2 mt-2 text-purple-400">
                        {tags.map((tag) => (
                            <span key={tag.id}>{tag.name}</span>
                        ))}
                    </div>
                </div>

                <button
                    onClick={() => setIsHidden(true)}
                    className="flex items-center gap-1 px-4 py-2 hover-animation font-bold rounded-sm select-none cursor-pointer
                    md:bg-transparent md:text-inherit
                    sm:bg-white sm:text-black sm:shadow sm:hover:shadow-md"
                >
                    Aperçu
                    <img src={arrowright} className="w-5" />
                </button>
            </div>

            {isHidden && (
                <ProjectDetail
                    title={title}
                    description={description}
                    subDescription={subDescription}
                    image={image}
                    tags={tags}
                    href={href}
                    closeModal={() => setIsHidden(false)}
                />
            )}
        </>
    );
};

export default ProjectList;