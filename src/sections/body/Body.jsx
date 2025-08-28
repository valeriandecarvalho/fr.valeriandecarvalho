import Hero from './hero/Hero.jsx';
import About from './about/About.jsx';
import Project from './project/Project.jsx';
import Formation from './formation/Formation.jsx';
import Experience from './experience/Experience.jsx';
import Contact from './contact/Contact.jsx';

const Body = () => {
    return (
        <>
            <Hero/>
            <About/>
            <Project/>
            <Formation/>
            <Experience/>
            <Contact />
        </>
    );
};

export default Body;