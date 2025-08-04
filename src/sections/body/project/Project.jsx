import SectionWrapper from "../SectionWrapper.jsx";
import { myProject } from "../../../configs/GetProject.js";
import ProjectList from "./ProjectList.jsx";

const Project = () => {
    return (
        <SectionWrapper id="projets" className="pt-18 xl:pt-20 mb-[100vh]">
            <h2 className="text-2xl md:text-3xl xl:text-4xl font-medium text-center mb-10">Projets Sélectionnés</h2>
            <div className="bg-gradient-to-r from-transparent via-text/50 to-transparent mt-12 h-[2px] w-3/4 md:w-2/3 xl:w-1/2 mx-auto"/>
            <div className="w-3/4 md:w-2/3 xl:w-1/2 mx-auto">
                {myProject.map((project) => (
                    <ProjectList key={project.id} {...project} />
                ))}
            </div>
            <div className="bg-gradient-to-r from-transparent via-text/50 to-transparent mt-12 h-[2px] w-3/4 md:w-2/3 xl:w-1/2 mx-auto"/>
        </SectionWrapper>
    );
};

export default Project;