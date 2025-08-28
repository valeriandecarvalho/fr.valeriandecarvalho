import clsx from "clsx";

const MobileMenuButton = ({ isMobileMenuOpen, toggleMobileMenu }) => {
    return (
        <div onClick={toggleMobileMenu} title="Cliquez pour ouvrir/fermer le menu"
             className="ml-6 block md:hidden cursor-pointer transition-all duration-300 transform hover:scale-110">
            {[1,2,3].map(i => <div key={i} className={clsx("indicator-line-horizontal", { active: isMobileMenuOpen })} style={{ animationDelay: `${i*0.1}s` }}/> )}
        </div>
    );
};

export default MobileMenuButton;