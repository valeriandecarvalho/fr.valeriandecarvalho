import SectionWrapper from "../SectionWrapper.jsx";
import { useState } from "react";
import emailjs from "@emailjs/browser";
import Alert from "./Alert.jsx";

const Contact = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });
    const [isLoading, setIsLoading] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [alertType, setAlertType] = useState("success");
    const [alertMessage, setAlertMessage] = useState("");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const showAlertMessage = (type, message) => {
        setAlertType(type);
        setAlertMessage(message);
        setShowAlert(true);
        setTimeout(() => setShowAlert(false), 5000);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            console.log("From submitted:", formData);
            await emailjs.send(
                import.meta.env.VITE_EMAILJS_SERVICE_ID,
                import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
                {
                    from_name: formData.name,
                    to_name: import.meta.env.VITE_CONTACT_TARGET_NAME,
                    from_email: formData.email,
                    to_email: import.meta.env.VITE_CONTACT_TARGET_EMAIL,
                    message: formData.message,
                },
                import.meta.env.VITE_EMAILJS_PUBLIC_KEY
            );
            setIsLoading(false);
            setFormData({ name: "", email: "", message: "" });
            showAlertMessage("success", "Votre message a bien été envoyé !");
        } catch (error) {
            setIsLoading(false);
            console.error(error);
            showAlertMessage("erreur", "Une erreur est survenue, veuillez réessayer !");
        }
    };

    return (
        <SectionWrapper id="contacter" className="pt-12 sm:pt-16 md:pt-18 xl:pt-20 mb-[50vh] sm:mb-[100vh] px-4 sm:px-6 md:px-8">
            {showAlert && <Alert type={alertType} text={alertMessage} />}
            <div className="flex flex-col items-center justify-center w-full max-w-sm sm:max-w-md md:max-w-lg p-4 sm:p-6 md:p-8 mx-auto border border-text/20 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-storm to-storm/20 backdrop-blur-xl shadow-xl sm:shadow-2xl relative z-10 hover:shadow-secondary/10 transition-all duration-500 hover:border-text/30">
                {/* Effet de lueur sur la carte */}
                <div className="absolute inset-0 rounded-2xl sm:rounded-3xl bg-gradient-to-r from-secondary/5 via-vividviolet/5 to-secondary/5 opacity-0 hover:opacity-100 transition-opacity duration-500"></div>

                <div className="flex flex-col items-start w-full gap-4 sm:gap-6 mb-8 sm:mb-10 md:mb-12 relative z-10">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-hover via-secondary/80 to-vividviolet bg-clip-text text-transparent animate-pulse leading-tight">
                        Discutons-en
                    </h2>
                    <p className="font-normal text-text leading-relaxed text-sm sm:text-base md:text-lg">
                        Que ce soit pour un stage, un projet étudiant, ou toute collaboration, je suis prêt à vous aider à le réaliser.
                    </p>
                </div>

                <form className="w-full space-y-4 sm:space-y-5 md:space-y-6 relative z-10" onSubmit={handleSubmit}>
                    <div className="group relative">
                        <label htmlFor="name" className="block text-xs sm:text-sm font-light text-text mb-2 sm:mb-3 transition-colors duration-300 group-focus-within:text-secondary">
                            Nom et Prénom
                        </label>
                        <div className="relative">
                            <input
                                id="name"
                                name="name"
                                type="text"
                                className="w-full px-3 sm:px-4 py-3 sm:py-4 text-sm sm:text-base bg-hover/5 border border-text/20 rounded-lg sm:rounded-xl text-hover placeholder-text/60 focus:outline-none focus:border-secondary focus:bg-hover/10 focus:ring-2 focus:ring-secondary/20 transition-all duration-300 hover:border-text/30 hover:bg-hover/8"
                                placeholder="John Doe"
                                autoComplete="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                            <div className="absolute inset-0 rounded-lg sm:rounded-xl bg-gradient-to-r from-secondary/0 to-vividviolet/0 group-focus-within:from-secondary/10 group-focus-within:to-vividviolet/10 transition-all duration-500 pointer-events-none"></div>
                        </div>
                    </div>

                    <div className="group relative">
                        <label htmlFor="email" className="block text-xs sm:text-sm font-light text-text mb-2 sm:mb-3 transition-colors duration-300 group-focus-within:text-secondary">
                            Email
                        </label>
                        <div className="relative">
                            <input
                                id="email"
                                name="email"
                                type="email"
                                className="w-full px-3 sm:px-4 py-3 sm:py-4 text-sm sm:text-base bg-hover/5 border border-text/20 rounded-lg sm:rounded-xl text-hover placeholder-text/60 focus:outline-none focus:border-secondary focus:bg-hover/10 focus:ring-2 focus:ring-secondary/20 transition-all duration-300 hover:border-text/30 hover:bg-hover/8"
                                placeholder="john.doe@email.com"
                                autoComplete="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                            <div className="absolute inset-0 rounded-lg sm:rounded-xl bg-gradient-to-r from-secondary/0 to-vividviolet/0 group-focus-within:from-secondary/10 group-focus-within:to-vividviolet/10 transition-all duration-500 pointer-events-none"></div>
                        </div>
                    </div>

                    <div className="group relative">
                        <label htmlFor="message" className="block text-xs sm:text-sm font-light text-text mb-2 sm:mb-3 transition-colors duration-300 group-focus-within:text-secondary">
                            Message
                        </label>
                        <div className="relative">
                            <textarea
                                id="message"
                                name="message"
                                rows="4"
                                className="w-full px-3 sm:px-4 py-3 sm:py-4 text-sm sm:text-base bg-hover/5 border border-text/20 rounded-lg sm:rounded-xl text-hover placeholder-text/60 focus:outline-none focus:border-secondary focus:bg-hover/10 focus:ring-2 focus:ring-secondary/20 transition-all duration-300 resize-none hover:border-text/30 hover:bg-hover/8 min-h-[100px] sm:min-h-[120px]"
                                placeholder="Laissez votre message ici..."
                                value={formData.message}
                                onChange={handleChange}
                                required
                            />
                            <div className="absolute inset-0 rounded-lg sm:rounded-xl bg-gradient-to-r from-secondary/0 to-vividviolet/0 group-focus-within:from-secondary/10 group-focus-within:to-vividviolet/10 transition-all duration-500 pointer-events-none"></div>
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full px-4 sm:px-6 py-3 sm:py-4 text-base sm:text-lg font-light text-hover bg-storm text-center rounded-lg sm:rounded-xl cursor-pointer bg-gradient-to-b from-secondary to-vividviolet border-secondary/50 focus:ring-4 focus:ring-secondary/30 transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-secondary/25 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:active:scale-100 relative overflow-hidden group"
                        disabled={isLoading}
                    >
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <div className="absolute w-1 h-1 bg-hover rounded-full animate-ping top-2 left-4"></div>
                            <div className="absolute w-1 h-1 bg-hover rounded-full animate-ping top-4 right-6 animation-delay-200"></div>
                            <div className="absolute w-0.5 h-0.5 bg-hover rounded-full animate-pulse bottom-3 left-8 animation-delay-400"></div>
                            <div className="absolute w-0.5 h-0.5 bg-hover rounded-full animate-pulse bottom-2 right-4 animation-delay-600"></div>
                            <div className="absolute w-1 h-1 bg-secondary/80 rounded-full animate-ping top-3 left-1/2 animation-delay-300"></div>
                            <div className="absolute w-0.5 h-0.5 bg-vividviolet/80 rounded-full animate-pulse bottom-4 left-1/3 animation-delay-800"></div>
                        </div>
                        <span className="relative z-10">
                            {!isLoading ? "Envoyer Message ✉️" : "Envoi en cours... 📡"}
                        </span>
                    </button>
                </form>
            </div>
        </SectionWrapper>
    );
};

export default Contact;