import {useState} from "react";
import {Navbar, Hero, Tagline, About, Projects, Formations, Experiences, Services, Footer} from './sections'
import { ScrollToSectionProvider } from "./context/ScrollToSectionContext.jsx";
import { AudioProvider } from "./context/AudioContext.jsx";
import Loader from './components/Loader';

function App() {
    const [isLoading, setIsLoading] = useState(true);
    return (
        <>
            {isLoading && <Loader onComplete={() => setIsLoading(false)} />}
            <div className={isLoading ? 'opacity-0' : 'opacity-100 transition-opacity duration-500'}>
                <AudioProvider>
                    <ScrollToSectionProvider>
                        <Navbar />
                        <Hero />
                        <Tagline />
                        <About />
                        <Projects />
                        <Formations />
                        <Experiences />
                        <Services />
                        <Footer />
                    </ScrollToSectionProvider>
                </AudioProvider>
            </div>
        </>
    )
}

export default App