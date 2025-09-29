export function getImageSrc(webpUrl, fallbackUrl) {
    if (typeof document === "undefined") return fallbackUrl;
    const img = new Image();
    img.src = "data:image/webp;base64,UklGRiIAAABXRUJQVlA4IBgAAAAwAQCdASoBAAEAAwA0JaQAA3AA/vuUAAA=";
    return img.height === 1 ? webpUrl : fallbackUrl;
}