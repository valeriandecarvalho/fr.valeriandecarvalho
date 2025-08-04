import { Html, useProgress } from "@react-three/drei";

const Loader = () => {
    const { progress } = useProgress();
    return (
        <Html center>
            <div className="flex items-center justify-center px-4 py-2 text-sm font-medium text-neutral-300 bg-primary/30 rounded-xl backdrop-blur-md">
                <p className="nav-link whitespace-nowrap text-white text-base">
                    Chargement : {Math.round(progress)}%
                </p>
            </div>
        </Html>
    );
};

export default Loader;