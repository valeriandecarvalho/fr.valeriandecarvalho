export function getVideoSrc(av1Url, fallbackUrl) {
    if (typeof document === "undefined") return fallbackUrl; // sécurité SSR
    const video = document.createElement("video");
    return video.canPlayType('video/webm; codecs="av01"')
        ? av1Url
        : fallbackUrl;
}