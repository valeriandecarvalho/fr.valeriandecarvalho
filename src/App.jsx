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

            <Services />
            <Footer />
            <div className="h-500 bg-secondary"></div>
            <Experiences />
        </>
    )
}

export default App