import clsx from "clsx";

const AudioPlayer = ({ isIndicatorActive, toggleAudio, audioRef }) => {
    return (
        <button onClick={toggleAudio} title="Cliquez pour activer/désactiver la musique"
                className="ml-10 flex items-center space-x-0.5 cursor-pointer hover:scale-110 transition-transform duration-300 ease-in-out">
            <audio ref={audioRef} className="hidden" src="/assets/audio/loop.mp3" loop />
            {[1,2,3,4].map(i => <div key={i} className={clsx("indicator-line", { active: isIndicatorActive })} style={{ animationDelay: `${i*0.1}s` }}/>)}
        </button>
    );
};

export default AudioPlayer;