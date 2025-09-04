import { useState, useEffect } from 'react';

const Loader = ({ onComplete }) => {
    const [progress, setProgress] = useState(0);
    useEffect(() => {
        const criticalResources = [
            '/videos/hero-1.mp4',
            '/videos/hero-2.mp4',
            '/images/logo-dark.webp',
            '/images/logo-light.webp',
            '/images/tagline.webp',
            '/sounds/hover.mp3',
            '/sounds/loop.mp3'
        ];
        let loaded = 0;
        const total = criticalResources.length;
        const loadResource = (src) => {
            return new Promise((resolve) => {
                const isVideo = src.includes('.mp4') && !src.includes('sounds');
                const isImage = src.includes('.webp') || src.includes('.png') || src.includes('.jpg');
                if (isVideo) {
                    const video = document.createElement('video');
                    video.onloadeddata = () => finishLoading();
                    video.onerror = () => finishLoading();
                    video.src = src;
                    video.preload = 'metadata';
                } else if (isImage) {
                    const img = new Image();
                    img.onload = () => finishLoading();
                    img.onerror = () => finishLoading();
                    img.src = src;
                } else {
                    const audio = new Audio();
                    audio.oncanplaythrough = () => finishLoading();
                    audio.onerror = () => finishLoading();
                    audio.src = src;
                    audio.preload = 'metadata';
                }
                function finishLoading() {
                    loaded++;
                    setProgress(Math.min(100, Math.round((loaded / total) * 100)));
                    resolve();
                }
            });
        };
        const loadResources = async () => {
            await Promise.allSettled(criticalResources.map(loadResource));
            setTimeout(() => {
                onComplete();
            }, 300);
        };
        loadResources();
    }, [onComplete]);
    return (
        <div className="loader-overlay fixed inset-0 z-[9999] bg-primary flex items-center justify-center">
            <div className="loader-content flex flex-col items-center gap-6">
                <img
                    src="/images/logo-light.webp"
                    alt="Logo"
                    className="w-14 h-14"
                />
                <div className="w-48 h-1 bg-secondary/20 rounded-full overflow-hidden">
                    <div
                        className="h-full bg-sunflower rounded-full transition-all duration-300 ease-out"
                        style={{ width: `${progress}%` }}
                    />
                </div>
                <div className="text-secondary font-semibold">
                    {Math.round(progress)}%
                </div>
            </div>
        </div>
    );
};

export default Loader;