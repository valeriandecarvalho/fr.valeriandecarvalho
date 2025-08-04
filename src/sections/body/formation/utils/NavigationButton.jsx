const NavigationButton = ({ direction, onClick, disabled, className = "" }) => (
    <button
        onClick={onClick}
        disabled={disabled}
        className={`items-center justify-center text-hover rounded-full p-3 shadow-lg transition-all border border-storm ${
            disabled ? 'opacity-30 cursor-not-allowed' : 'hover:bg-secondary/30 hover:border-secondary'
        } ${className}`}
    >
        <svg className="h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={direction === 'left' ? "M15 19l-7-7 7-7" : "M9 5l7 7-7 7"} />
        </svg>
    </button>
);

export default NavigationButton;