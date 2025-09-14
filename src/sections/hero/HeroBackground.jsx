const HeroBackground = ({ getVideoSrc }) => {
    return (
        <video
            src={getVideoSrc}
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover object-center z-0"
        />
    );
};

export default HeroBackground;