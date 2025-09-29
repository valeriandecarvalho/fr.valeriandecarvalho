import { useState, useEffect, useRef } from 'react';
import { getVideoSrc } from "./getVideoSrc.jsx";
import { getImageSrc} from "./getImageSrc.jsx";

const Loader = ({ onComplete }) => {
    const [progress, setProgress] = useState(0);
    const loadedRef = useRef(new Set());

    useEffect(() => {
        const videoUrl = getVideoSrc(
            "https://fr-valeriandecarvalho.b-cdn.net/videos/webm/hero_av1.webm",
            "https://fr-valeriandecarvalho.b-cdn.net/videos/mp4/hero_h264.mp4"
        );
        const imageUrl = getImageSrc(
            "https://fr-valeriandecarvalho.b-cdn.net/images/webp/tagline.webp",
            "https://fr-valeriandecarvalho.b-cdn.net/images/png/tagline.png",
        )
        const resources = [
            '/logo-dark.webp',
            '/logo-light.webp',
            videoUrl,
            imageUrl,
            'https://fr-valeriandecarvalho.b-cdn.net/sounds/hover.mp3',
            'https://fr-valeriandecarvalho.b-cdn.net/sounds/loop.mp3',
            'https://fr-valeriandecarvalho.b-cdn.net/fonts/PoetsenOne-Regular.woff2',
            'https://fr-valeriandecarvalho.b-cdn.net/fonts/Zentry-Regular.woff2'
        ];
        let completed = 0;
        const total = resources.length;
        const timeouts = new Set();
        const updateProgress = () => {
            completed++;
            setProgress(Math.round((completed / total) * 100));
            if (completed >= total) setTimeout(onComplete, 200);
        };
        const loadResource = (src) => {
            if (loadedRef.current.has(src)) return updateProgress();
            const timer = setTimeout(() => {
                timeouts.delete(timer);
                if (!loadedRef.current.has(src)) updateProgress();
            }, src.includes('.webm') ? 8000 : 5000);
            timeouts.add(timer);
            if (src.match(/\.(webp|webm|mp4)$/)) {
                const media = src.includes('.webm') ? document.createElement('video') : new Image();
                media.onload = media.onerror = media.onloadedmetadata = () => {
                    clearTimeout(timer);
                    timeouts.delete(timer);
                    loadedRef.current.add(src);
                    updateProgress();
                };
                media.src = src;
                if (src.includes('.webm')) media.preload = 'metadata';
            }
            else if (src.includes('.woff2')) {
                const font = new FontFace(src.includes('Poetsen') ? 'poetsen-one' : 'zentry', `url(${src})`);
                font.load().then(() => {
                    document.fonts.add(font);
                    clearTimeout(timer);
                    loadedRef.current.add(src);
                    updateProgress();
                }).catch(() => updateProgress());
            }
            else {
                const audio = new Audio();
                audio.oncanplaythrough = audio.onerror = () => {
                    clearTimeout(timer);
                    loadedRef.current.add(src);
                    updateProgress();
                };
                audio.src = src;
            }
        };
        resources.forEach(loadResource);
        const globalTimer = setTimeout(() => {
            timeouts.forEach(clearTimeout);
            onComplete();
        }, 15000);
        return () => {
            timeouts.forEach(clearTimeout);
            clearTimeout(globalTimer);
        };
    }, [onComplete]);

    return (
        <div className="loader-overlay fixed inset-0 z-[9999] bg-primary flex items-center justify-center">
            <div className="loader-content flex flex-col items-center gap-6">
                <img src="/logo-light.webp" alt="Logo" className="w-14 h-14" />
                <div className="w-48 h-1 bg-secondary/20 rounded-full overflow-hidden">
                    <div className="h-full bg-sunflower rounded-full transition-all duration-300 ease-out"
                         style={{ width: `${progress}%` }} />
                </div>
                <div className="text-secondary font-semibold">{progress}%</div>
            </div>
        </div>
    );
};

export default Loader;