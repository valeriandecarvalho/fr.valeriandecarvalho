import {Navbar, Hero, Tagline, About, Projects, Formations, Experiences, Services, Footer} from './sections'
import { ScrollToSectionProvider } from "./context/ScrollToSectionContext.jsx";
import { AudioProvider } from "./context/AudioContext.jsx";

function App() {

    return (
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
    )
}

export default App