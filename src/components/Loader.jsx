import { useState, useEffect } from 'react';

const Loader = ({ onComplete }) => {
    const [progress, setProgress] = useState(0);
    useEffect(() => {
        const criticalResources = [
            '/images/logo-dark.webp',
            '/images/logo-light.webp',
            '/images/tagline.webp',
            '/sounds/hover.mp3',
            '/sounds/loop.mp3'
        ];
        let loaded = 0;
        const total = criticalResources.length;
        const loadResource = (src) => new Promise((resolve) => {
            let resource;
            const timeoutDuration = 5000;
            const timer = setTimeout(() => finish(), timeoutDuration);
            function finish() {
                clearTimeout(timer);
                loaded++;
                setProgress(Math.round((loaded / total) * 100));
                resolve();
            }
            if (src.match(/\.(webp|png|jpg)$/)) {
                resource = new Image();
                resource.onload = finish;
            } else {
                resource = new Audio();
                resource.oncanplaythrough = finish;
            }
            resource.onerror = finish;
            resource.src = src;
            resource.preload = 'metadata';
        });
        Promise.allSettled(criticalResources.map(loadResource)).then(() => {
            setTimeout(onComplete, 300);
        });
    }, [onComplete]);

    return (
        <div className="loader-overlay fixed inset-0 z-[9999] bg-primary flex items-center justify-center">
            <div className="loader-content flex flex-col items-center gap-6">
                <img src="/images/logo-light.webp" alt="Logo" className="w-14 h-14" />
                <div className="w-48 h-1 bg-secondary/20 rounded-full overflow-hidden">
                    <div className="h-full bg-sunflower rounded-full transition-all duration-300 ease-out" style={{ width: `${progress}%` }} />
                </div>
                <div className="text-secondary font-semibold">{progress}%</div>
            </div>
        </div>
    );
};

export default Loader;