import {Navbar, Hero, Tagline, About, Projects, Formations, Experiences, Services, Footer} from './components'

function App() {

    return (
        <>
            <Navbar />
            <Hero />
            <Tagline />
            <About />
            <Projects />
            <Formations />
            <Experiences />
            <Services />
            <div className="h-500 bg-secondary"></div>
            <Footer />
        </>
    )
}

export default App