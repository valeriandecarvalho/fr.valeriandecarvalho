import { OrbitingCircle } from "./OrbitingCircle.jsx";
import {
    arduino,
    cplusplus,
    csharp,
    css,
    docker,
    figma,
    git,
    html,
    intellij,
    java,
    javascript,
    mongodb,
    nodejs,
    python,
    raspberry,
    reactjs,
    redux,
    stackoverflow,
    tailwind,
    threejs,
    typescript,
    vitejs,
    vscode,
    webstorm,
} from "../../../assets";

export function SkillCircle() {
    const skills = [
        { name: "arduino", icon: arduino },
        { name: "cplusplus", icon: cplusplus },
        { name: "csharp", icon: csharp },
        { name: "css", icon: css },
        { name: "docker", icon: docker },
        { name: "figma", icon: figma },
        { name: "git", icon: git },
        { name: "html", icon: html },
        { name: "intellij", icon: intellij },
        { name: "java", icon: java },
        { name: "javascript", icon: javascript },
        { name: "mongodb", icon: mongodb },
        { name: "nodejs", icon: nodejs },
        { name: "python", icon: python },
        { name: "raspberry", icon: raspberry },
        { name: "reactjs", icon: reactjs },
        { name: "redux", icon: redux },
        { name: "stackoverflow", icon: stackoverflow },
        { name: "tailwind", icon: tailwind },
        { name: "threejs", icon: threejs },
        { name: "typescript", icon: typescript },
        { name: "vitejs", icon: vitejs },
        { name: "vscode", icon: vscode },
        { name: "webstorm", icon: webstorm },
    ];

    return (
        <div className="relative flex h-[10rem] w-full flex-col items-center justify-center">
            <OrbitingCircle iconSize={35}>
                {skills.map((skill, index) => (
                    <Icon key={index} src={skill.icon} />
                ))}
            </OrbitingCircle>
            <OrbitingCircle iconSize={20} radius={100} reverse speed={2}>
                {[...skills].reverse().map((skill, index) => (
                    <Icon key={index} src={skill.icon} />
                ))}
            </OrbitingCircle>
        </div>
    );
}

const Icon = ({ src }) => (
    <img src={src} className="duration-200 rounded-sm hover:scale-110" alt="" />
);